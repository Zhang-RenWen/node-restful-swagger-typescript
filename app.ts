/**
 * Required External Modules
 */
import dotenv = require('dotenv')
dotenv.config()
import cors from 'cors'
import helmet from 'helmet'
import express = require('express')
import { Routes } from './src/routes/testRoutes'
// firebase
// import db = require('./src/connections/firebase_admin')
// mongodb
// import dbm = require('./src/connections/mongodb')

// const { client, dbName } = dbm

/**
 * Server Activation
 */

class App {
  public app: express.Application = express()
  public routePrv: Routes = new Routes()

  constructor() {
    this.config()
    this.launchWebSocket()
    this.routePrv.routes(this.app)
  }

  private launchWebSocket(): void {
    const WebSocket = require('ws')
    const server = new WebSocket.Server({ port: 8080 })
    server.on('open', function open() {
      console.log('connected')
    })

    server.on('close', function close() {
      console.log('disconnected')
    })

    server.on('connection', function connection(ws, req) {
      const ip = req.connection.remoteAddress
      const port = req.connection.remotePort
      const clientName = ip + port

      console.log('%s is connected', clientName)

      //告訴使用者自己的ID
      ws.send(`${clientName} 已加入聊天！`)

      ws.on('message', function incoming(message) {
        console.log('received: %s from %s', message, clientName)
        //廣播所有聊天室使用者
        server.clients.forEach(function each(client) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(clientName + ' -> ' + message)
          }
        })
      })
    })
  }

  private config(): void {
    // other setting : https://www.npmjs.com/package/swagger-ui-express
    const swaggerUi = require('swagger-ui-express')
    const swaggerDocument = require('./swagger.json')
    const options = {
      swaggerOptions: {
        validatorUrl: null
      }
    }
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

    //port settings
    const port = process.env.PORT || 3000
    // serving static files
    this.app.use(express.static('public'))
    /**
     *  App Configuration
     */
    this.app.use(express.static('public'))
    this.app.use(helmet())
    this.app.use(cors())
    this.app.listen(port)
  }
}

export default new App().app
