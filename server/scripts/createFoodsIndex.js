const {connectDB} = require("../database");

async function createIndex() {
  const db = await connectDB();
  await db.collection("foods").createIndex({userId: 1, date: 1, name: 1});
  console.log("Foods index created");
  process.exit(0);
}

createIndex();
