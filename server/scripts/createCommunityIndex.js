const {connectDB, closeConnection} = require("../database");

async function createIndex() {
  const db = await connectDB();
  await db.collection("communities").createIndex({posts: 1, users: 1});
  console.log("Community index created");
  process.exit(0);
}

createIndex();
setTimeout(() => closeConnection(), 500);
