// reference: https://www.npmjs.com/package/swagger-autogen
const swaggerAutogen = require('swagger-autogen')()
const outputFile = './swagger.json' // 輸出的文件名稱
const endpointsFiles = ['./src/routes/testRoutes.ts'] // 要指向的 API，通常使用 Express 直接指向到 app.js 就可以
swaggerAutogen(outputFile, endpointsFiles)
