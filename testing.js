const fs = require("fs-extra");
//const fs_extra = require("fs-extra");
const path = require("path");
const csv = require("csvtojson");

const csvFilePath = path.join(__dirname, "data", "CSV-Files", "meetLogs.csv");

const jsonFilePath = path.join(__dirname, "data", "meet_logs.json");

const map1 = new Map();
const map2 = new Map();

const w = async () => {
  try {
    const CSV_DATA = await csv().fromFile(csvFilePath);

    const meet_logs = {
      results: CSV_DATA,
    };

    //console.log(meet_logs);
    //Writing Content for CSV file to JSON
    //  fs.writeFileSync(jsonFilePath, JSON.stringify(meet_logs));
    console.log("Converted CSV file to JSON Sucessfully!");
    //Extracting the Data
    let data = meet_logs.results;
    console.log(data.length);
    let x69 = 0;
    for (let d of data) {
      if (x69 > 6500) {
        break;
      }
      x69++;
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
    const Extracted_Data = JSON.stringify(obj);
    //Extracting The Data
    await fs.ensureDir("logs");
    //fs.writeFileSync("./logs/Logs.json", Extracted_Data);
    console.log("Extracting The Data");

    //Dividing into Categories
    const Logs = Extracted_Data;

    for (let logs in Logs) {
      let temp = Logs[logs];
      let x = temp[0];

      const particapts = [];

      for (data of temp) {
        if (data.Date) particapts.push(data);
      }

      if (map2.has(x["Organizer Email"])) {
        let v = map2.get(x["Organizer Email"]);
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
        map2.set(x["Organizer Email"], v);
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

        map2.set(x["Organizer Email"], v);
      }
    }

    const obj2 = Object.fromEntries(map2);
    await fs.ensureDir("category");
    fs.writeFileSync("./category/Logs2.json", JSON.stringify(obj2));
    console.log("success!");
  } catch (e) {
    console.log(e);
  }
};

w();
