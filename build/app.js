"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Required External Modules
 */
const dotenv = require("dotenv");
dotenv.config();
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express = require("express");
// firebase
const db = require("./src/connections/firebase_admin");
// mongodb
const dbm = require("./src/connections/mongodb");
const { client, dbName } = dbm;
const app = express();
// other setting : https://www.npmjs.com/package/swagger-ui-express
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const options = {
    swaggerOptions: {
        validatorUrl: null
    }
};
// reference: https://www.npmjs.com/package/swagger-autogen
const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger_output.json'; // 輸出的文件名稱
const endpointsFiles = ['./app.js']; // 要指向的 API，通常使用 Express 直接指向到 app.js 就可以
swaggerAutogen(outputFile, endpointsFiles);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
/**
 *  App Configuration
 */
app.use(express.static('public'));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
/**
 *  @swagger
 */
app.get('/aowaow', (req, res) => {
    const myNameRef = db.ref('/aowaow');
    // 快照
    myNameRef.once('value', (snapshot) => {
        res.send({
            success: true,
            result: snapshot.val(),
            message: '資料讀取成功'
        });
    });
});
app.get('/documents', (req, res) => {
    function main() {
        return __awaiter(this, void 0, void 0, function* () {
            // Use connect method to connect to the server
            yield client.connect();
            console.log('Connected successfully to server');
            const db = client.db(dbName);
            const collection = db.collection('documents');
            const all = yield collection.find({ a: 1 }).toArray();
            // console.log(await collection.createIndex())
            const ex = yield collection.find({ a: 1 }).explain('executionStats');
            console.log(ex);
            res.send({
                success: true,
                result: all,
                message: '資料讀取成功'
            });
            return 'done.';
        });
    }
    main()
        .then(console.log)
        .catch(console.error)
        .finally(() => client.close());
});
// 新增邏輯
/**
 * Server Activation
 */
const port = process.env.PORT || 3000;
app.listen(port);
