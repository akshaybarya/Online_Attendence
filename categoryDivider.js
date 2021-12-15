const Logs = require("./logs/Logs.json");
const fs = require("fs-extra");
const fs2 = require("fs");
const path = require("path");

const map1 = new Map();

module.exports = async function () {
  for (let logs in Logs) {
    let temp = Logs[logs];
    let x = temp[0];

    const particapts = [];

    for (data of temp) {
      if (data.Date) particapts.push(data);
    }

    if (map1.has(x["Organizer Email"])) {
      let v = map1.get(x["Organizer Email"]);
      if (v.class)
        v.class.push({
          "Meeting Code": x["Meeting Code"],
          "number of participants": particapts.length,
          date: particapts[0].Date,
          particapts,
        });
      else {
        v = {
          class: [
            {
              "Meeting Code": x["Meeting Code"],
              "number of participants": particapts.length,
              date: particapts[0].Date,
              particapts,
            },
          ],
        };
      }
      map1.set(x["Organizer Email"], v);
    } else {
      let v = {
        class: [
          {
            "Meeting Code": x["Meeting Code"],
            "number of participants": particapts.length,
            date: particapts[0].Date,
            particapts,
          },
        ],
      };

      map1.set(x["Organizer Email"], v);
    }
  }

  const obj = Object.fromEntries(map1);
  await fs.ensureDir("category");
  fs2.writeFileSync("./category/Logs.json", JSON.stringify(obj));
  console.log("success!");
};
