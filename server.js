const express = require("express");
const upload = require("express-fileupload");
const app = express();
var cors = require("cors");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const extractData = require("./extractData");
const categoryDivider = require("./categoryDivider");
const auth = require("./middleware/auth");
const connectDB = require("./config/db");
const Logs1 = require("./logs/Logs.json");
const Logs2 = require("./category/Logs.json");
const User = require("./models/User");

app.use(cors());
app.use(express.json());
app.use(upload());
connectDB();

const csvFilePath = path.join(__dirname, "data", "CSV-Files", "meetLogs.csv");

app.get("/", (req, res) => {
  res.send("This is home page.");
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
    await extractData();
    await categoryDivider();
    res.send("File Uploaded!");
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/register", auth, async (req, res) => {
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
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.send("User Registered!");
  } catch (error) {
    res.send(error.message);
  }
});

app.get("/meet_logs", async (req, res) => {
  res.send(Logs1);
});

app.get("/category_logs", async (req, res) => {
  res.send(Logs2);
});

app.post(`/meeting_logs`, async (req, res) => {
  res.send(Logs1[req.body.id]);
});

app.post(`/teacher_logs`, async (req, res) => {
  res.send(Logs2[req.body.id]);
});

app.listen(5000, () => {
  console.log("listening on port: 5000");
});
