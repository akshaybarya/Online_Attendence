const express = require("express");
const upload = require("express-fileupload");
const app = express();
var cors = require("cors");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("./middleware/auth");
const adminAuth = require("./middleware/adminAuth");
const userAuth = require("./middleware/userAuth");
const connectDB = require("./config/db");
const Logs1 = require("./logs/Logs.json");
const Logs2 = require("./category/Logs.json");
const User = require("./models/User");
const test = require("./test");

app.use(cors());
app.use(express.json());
app.use(upload());
connectDB();

const csvFilePath = path.join(__dirname, "data", "CSV-Files", "meetLogs.csv");

app.get("/", (req, res) => {
  res.send("This is home page.");
});

app.post("/", userAuth, async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.user });
    //console.log(user.isAdmin);

    res
      .status(200)
      .send({ name: user.name, email: user.email, isAdmin: user.isAdmin });
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: error.message }] });
  }
});

app.post("/add-csv", async (req, res) => {
  try {
    //let file = req.files;
    const file = req.files.file;

    file.mv(csvFilePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });
    res.send("File Uploaded!");
    await test();
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/register", adminAuth, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exsist" }] });
    }

    user = new User({
      name,
      email,
      password,
      isAdmin: false,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.send("User Registered!");
  } catch (error) {
    res.send(error.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const payload = {
      user: {
        id: user.email,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/meet_logs", adminAuth, async (req, res) => {
  res.send(Logs1);
});

app.get("/category_logs", adminAuth, async (req, res) => {
  res.send(Logs2);
});

app.post(`/meeting_logs`, userAuth, async (req, res) => {
  res.status(200).send(Logs1[req.body.id]);
});

app.post(`/attendence`, async (req, res) => {
  const s = Logs1[req.body.id];
  let data = [];
  for (let row of s) {
    if (row.Date) {
      let temp = {
        name: row["Participant Name"],
      };
      data.push(temp);
    }
  }
  res.status(200).send(data);
});

app.post(`/teacher_logs`, auth, async (req, res) => {
  res.status(200).send(Logs2[req.body.id]);
});

app.listen(5000, () => {
  console.log("listening on port: 5000");
});
