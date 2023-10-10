const { MongoClient } = require('mongodb')
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url =
  'mongodb+srv://blog-app:hDU6hu0lAvaX4XRr@cluster0.v5ei7.mongodb.net/myblog?retryWrites=true&w=majority'
const client = new MongoClient(url)

// Database Name
const dbName = 'myblog'

export = { client, dbName }
