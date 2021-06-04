const fs = require("fs").promises
const path = require("path")
const dataPath = path.join("../","data","data.txt")

const dashboardFunc = async ()=>{
	try{
		const productsData = await fs.readFile(dataPath,"utf8")
		const productsJson = JSON.parse(productsData)
	
		console.table(productsJson)
	}catch{
		console.log(error)
	}
	
}

const sellCalcFunc = async (productName,productSelledCount)=>{
	
	try{
		if(!productName || !productSelledCount){
			return console.log("Iltimos fieldlarni toldiring")
		}
		if(isNaN(productSelledCount-0)){
			return console.log("Iltimos sotilganga raqam kiriting")
		}
	
		const productsData = await fs.readFile(dataPath,"utf8")
		const productsJson = JSON.parse(productsData)
		
		const hasProduct = productsJson.find((product)=>product.productName.toLowerCase() === productName.toLowerCase())
		
		if(!hasProduct){return console.log("bunday mahsulot mavjud emas")}
		
		if(Number(productSelledCount) > hasProduct.productExistCount){
			return console.log("sotilgan mahsulot bor mahsulotdan kop bolsa olmaydi")
		}
			
		hasProduct.productSelledCount += Number(productSelledCount)
		hasProduct.productExistCount = hasProduct.productStarterCount - hasProduct.productSelledCount
	
		await fs.writeFile(dataPath,JSON.stringify(productsJson))
	
		console.log(`${productName} muvaffaqqiyatli sotildi, qoldiq: ${hasProduct.productExistCount}`)
	}catch(error){
		console.log(error)
	}
	
}

const addProduct = async (productName,productStarterCount)=>{
	
	try{
		if(!productName || !productStarterCount){
			return console.log("Iltimos fieldlarni toldiring")
		}
		if(isNaN(productStarterCount-0)){
			return console.log("Iltimos sotilganga raqam kiriting")
		}
	
		const productsData = await fs.readFile(dataPath,"utf8")
		const productsJson = JSON.parse(productsData)
		const hasProduct = productsJson.find((product)=>product.productName.toLowerCase() === productName.toLowerCase())
		
		if(hasProduct){
			hasProduct.productStarterCount += Number(productStarterCount)
			hasProduct.productExistCount = Number(hasProduct.productStarterCount) - hasProduct.productSelledCount
		}else{
			productsJson.push({productName, productStarterCount:Number(productStarterCount), productExistCount:Number(productStarterCount),productSelledCount:0})
		}

		await fs.writeFile(dataPath,JSON.stringify(productsJson))
	
		console.log(`${productStarterCount} ta ${productName} qoshildi`)
	}catch(error){
		console.log(error)
	}
	
}


//console.log(productName,productCount,dataPath)

module.exports = {
	dashboardFunc,
	sellCalcFunc,
	addProduct
}
