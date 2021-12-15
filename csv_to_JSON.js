const fsExtra = require("fs-extra");
const fs = require("fs");
const path = require("path");
const csv = require("csvtojson");

const csvFilePath = path.join(__dirname, "data", "CSV-Files", "meetLogs.csv");

const jsonFilePath = path.join(__dirname, "data", "meet_logs.json");

const w = async () => {
  try {
    const data = await csv().fromFile(csvFilePath);

    const meet_logs = {
      results: data,
    };

    //console.log(meet_logs);

    fs.writeFileSync(jsonFilePath, JSON.stringify(meet_logs));

    console.log("Converted Sucessfully!");
  } catch (e) {
    console.log(e);
  }
};

module.exports = w;
