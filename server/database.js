const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;

let db;
let client;

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
  try {
    await client.close();
  } catch (error) {
    console.error(error);
  }
}

exports.closeConnection = closeConnection;
