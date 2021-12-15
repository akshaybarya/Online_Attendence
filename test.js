const extractData = require("./extractData");
const categoryDivider = require("./categoryDivider");
const csv_to_JSON = require("./csv_to_JSON");

const w = async () => {
  try {
    await csv_to_JSON();
    console.log("CSV to JSON");
    await extractData();
    console.log("Data Extracted");
    await categoryDivider();
    console.log("Category Divided");
    console.log("Sucessfully Executed!!");
  } catch (e) {
    console.log(e.message);
  }
};

//w();

module.exports = w;
