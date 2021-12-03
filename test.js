const extractData = require("./extractData");
const categoryDivider = require("./categoryDivider");
const csv_to_JSON = require("./csv_to_JSON");

const w = async () => {
  try {
    await csv_to_JSON();
    await extractData();
    await categoryDivider();
    console.log("Sucess!!");
  } catch (e) {
    console.log(e.message);
  }
};

w();
