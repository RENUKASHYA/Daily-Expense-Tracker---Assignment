const { Parser } = require("json2csv");

const generateCSV = (expenses) => {
  const fields = ["amount", "description", "paidBy.name", "participants", "splitMethod", "splitDetails"];
    const opts = { fields }
    const parser = new Parser(opts);
    return parser.parse(expenses)
};


module.exports = generateCSV;