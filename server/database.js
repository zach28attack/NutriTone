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
    if (client) {
      await client.close();
    }
  } catch (error) {
    // if the error is thrown because the client obj gets called before it can  get initialized
    // it will run after 100 ms
    setTimeout(async () => {
      console.log("running close in timeout");
      try {
        await client.close();
      } catch (error) {
        console.error("Error after timout:", error);
      }
      console.log("close executed");
    }, 100);
  }
}

exports.closeConnection = closeConnection;
