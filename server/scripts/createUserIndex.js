const {connectDB} = require("../database");

async function createIndex() {
  const db = await connectDB();
  await db.collection("users").createIndex({email: 1, username: 1}, {unique: true});
  console.log("user index created, unique contraint added");
  process.exit(0);
}

createIndex();
