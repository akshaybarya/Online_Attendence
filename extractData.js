const meet_logs = require("./data/meet_logs.json");
const fs = require("fs-extra");
const path = require("path");

const map1 = new Map();

module.exports = async function () {
  const deployPath = path.join(__dirname, "logs");
  fs.removeSync(deployPath);

  let data = meet_logs.results;
  for (let d of data) {
    let variable = {
      date: d["Date"],
      "Meeting Code": d["Meeting Code"],
      "Organizer Email": d["Organizer Email"],
    };
    var temp = map1.get(d["Meeting Code"]);
    if (temp && temp.length > 0) temp.push(d);
    else temp = [variable, d];
    map1.set(d["Meeting Code"], temp);
  }

  const obj = Object.fromEntries(map1);

  await fs.ensureDir("logs");
  await fs.writeJson("./logs/Logs.json", obj);
  console.log("success!");
};
