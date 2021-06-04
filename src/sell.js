const { sellCalcFunc } = require("./modules")
const [,,productName,productSelledCount] = process.argv

sellCalcFunc(productName,productSelledCount)
