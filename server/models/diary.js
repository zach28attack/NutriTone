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
  async getTenDiaries() {}
}

module.exports = Diary;
