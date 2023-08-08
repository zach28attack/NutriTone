const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;

let db;
let client;

async function connectDB() {
  const uri = "mongodb+srv://zach28attack:MongoDBPassword@cluster0.im0uft8.mongodb.net/?retryWrites=true&w=majority";
  try {
    client = new mongoClient(uri);
    client = await client.connect();
    db = client.db();
    return db;
  } catch (error) {
    console.error(error);
  }
}

exports.connectDB = connectDB;

async function closeConnection() {
  try {
    if (client) {
      await client.close();
    }
  } catch (error) {
    console.error("DB ERROR:", error);
  } finally {
    client = null;
    db = null;
  }
}

exports.closeConnection = closeConnection;
