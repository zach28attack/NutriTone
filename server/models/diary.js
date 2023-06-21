const mongoDB = require("mongodb");
const {connectDB} = require("../database");

class Diary {
  constructor(id, userId, items, date) {
    this.id = id;
    this.userId = userId;
    this.items = items;
    this.date = date;
  }
  async saveItemToDiary() {
    const db = await connectDB();
    const result = await db.collection("diaries").findOne({userId: this.userId, date: this.date});
    if (result !== null) {
      return true;
    } else {
      return false;
    }
  }
  async getOneDiary() {
    const db = await connectDB();
    const result = await db.collection("diaries").findOne({userId: new mongoDB.ObjectId(this.userId), date: this.date});
    if (result !== null) {
      this.items = result.items;
      return true;
    } else {
      return false;
    }
  }
  async getTenDiaries() {
    const db = await connectDB();
    const result = await db
      .collection("diaries")
      .find({userId: new mongoDB.ObjectId(this.userId)})
      .limit(10)
      .toArray();

    return result;
  }
}

module.exports = Diary;
