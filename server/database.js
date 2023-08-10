const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;

let db = null;
let client = null;

// if db is already connected return db, else connect then return db
async function dbConnection() {
  if (db !== null) {
    return db;
  } else if (db === null) {
    console.log("NEW CONNECTION");
    await connectDB();
    return db;
  }
}
exports.dbConnection = dbConnection;

// connect and return db
async function connectDB() {
  const uri = "mongodb+srv://zach28attack:MongoDBPassword@cluster0.im0uft8.mongodb.net/?retryWrites=true&w=majority";
  try {
    client = new mongoClient(uri);
    const clientConnection = await client.connect();
    db = clientConnection.db();
  } catch (error) {
    console.error(error);
  }
}

// close db connection
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
