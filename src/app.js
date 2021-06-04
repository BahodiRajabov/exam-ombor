const {dashboardFunc,sellCalcFunc,addProduct} = require("./modules")



const [,,commandType,argName,argCount] = process.argv

;(async ()=>{
		
	if(!commandType){
	
		await dashboardFunc()
		
	}else if( commandType === "--dep" ){
		
		await addProduct(argName,argCount)
		
	}else if(commandType === "--sell") {
		
		await sellCalcFunc(argName,argCount)
			
	}
	
})()
