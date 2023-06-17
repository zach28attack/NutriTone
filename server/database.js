const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;

let db;

async function connectDB() {
  const uri = "mongodb+srv://zach28attack:MongoDBPassword@cluster0.im0uft8.mongodb.net/?retryWrites=true&w=majority";
  try {
    const client = await mongoClient.connect(uri);
    db = client.db();
    console.log("DB connection success");
    return db;
  } catch (error) {
    console.error(error);
  }
}

exports.connectDB = connectDB;
