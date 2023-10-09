"use strict";
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
const testRoutes_1 = require("./src/routes/testRoutes");
// firebase
// import db = require('./src/connections/firebase_admin')
// mongodb
// import dbm = require('./src/connections/mongodb')
// const { client, dbName } = dbm
/**
 * Server Activation
 */
class App {
    constructor() {
        this.app = express();
        this.routePrv = new testRoutes_1.Routes();
        this.config();
        // this.launchWebSocket();
        this.routePrv.routes(this.app);
    }
    // private launchWebSocket(): void {
    //   const WebSocket = require("ws");
    //   const server = new WebSocket.Server({ port: 8080 });
    //   server.on("open", function open() {
    //     console.log("connected");
    //   });
    //   server.on("close", function close() {
    //     console.log("disconnected");
    //   });
    //   server.on("connection", function connection(ws, req) {
    //     const ip = req.connection.remoteAddress;
    //     const port = req.connection.remotePort;
    //     const clientName = ip + port;
    //     console.log("%s is connected", clientName);
    //     //告訴使用者自己的ID
    //     ws.send(`${clientName} 已加入聊天！`);
    //     ws.on("message", function incoming(message) {
    //       console.log("received: %s from %s", message, clientName);
    //       //廣播所有聊天室使用者
    //       server.clients.forEach(function each(client) {
    //         if (client.readyState === WebSocket.OPEN) {
    //           client.send(clientName + " -> " + message);
    //         }
    //       });
    //     });
    //   });
    // }
    config() {
        // other setting : https://www.npmjs.com/package/swagger-ui-express
        const swaggerUi = require("swagger-ui-express");
        const swaggerDocument = require("./swagger.json");
        const options = {
            swaggerOptions: {
                validatorUrl: null,
            },
        };
        this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
        //port settings
        const port = process.env.PORT || 3000;
        // serving static files
        this.app.use(express.static("public"));
        /**
         *  App Configuration
         */
        this.app.use(express.static("public"));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)());
        this.app.listen(port);
    }
}
exports.default = new App().app;
