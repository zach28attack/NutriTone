const {connectDB} = require("../database");

async function createIndex() {
  const db = await connectDB();
  await db.collection("tokens").createIndex({token: 1, userId: 1}, {unique: true});
  console.log("token index created, unique contraint added");
  process.exit(0);
}

createIndex();
