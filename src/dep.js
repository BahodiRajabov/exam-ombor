const { addProduct } = require("./modules")

const [,,productName,productStarterCount] = process.argv

addProduct(productName,productStarterCount)




