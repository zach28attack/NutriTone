const {connectDB} = require("../database");

async function createIndex() {
  const db = await connectDB();
  await db.collection("diaries").createIndex({userId: 1, date: 1, timeOfDay: 1});
  console.log("Diary index created");
  process.exit(0);
}

createIndex();
