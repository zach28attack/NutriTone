const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;

let db = null;
let client = null;

async function connectDB() {
  const uri = "mongodb+srv://zach28attack:MongoDBPassword@cluster0.im0uft8.mongodb.net/?retryWrites=true&w=majority";
  try {
    client = await mongoClient.connect(uri);
    db = client.db();
    return db;
  } catch (error) {
    console.error(error);
  }
}

exports.connectDB = connectDB;

async function closeConnection() {
  if (client) {
    try {
      client.close();
      db = null;
      client = null;
    } catch (error) {
      console.error("DB ERROR:", error);
    }
  }
}

exports.closeConnection = closeConnection;
