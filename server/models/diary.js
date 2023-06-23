const mongoDB = require("mongodb");
const {connectDB} = require("../database");

class Diary {
  constructor(id, userId, items, date, item) {
    this.id = id;
    this.userId = userId;
    this.items = items;
    this.date = date;
    this.item = item;
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
  async saveItemToDiary() {
    const db = await connectDB();
    const id = new mongoDB.ObjectId();
    const result = await db.collection("diaries").updateOne(
      {userId: new mongoDB.ObjectId(this.userId), date: this.date},
      {
        $push: {
          items: {
            _id: id,
            name: this.item.name,
            calories: this.item.calories,
            servings: this.item.servings,
            timeOfDay: this.item.timeOfDay,
          },
        },
      },
      {upsert: true}
    );
    if (result) {
      return id;
    } else {
      return false;
    }
  }
  async updateItem() {
    const db = await connectDB();
    const result = await db.collection("diaries").updateOne(
      {
        userId: new mongoDB.ObjectId(this.userId),
        date: this.date,
        items: {$elemMatch: {_id: new mongoDB.ObjectId(this.item._id)}},
      },
      {
        $set: {"items.$[]": this.item},
      }
    );
    console.log(result);
  }
}

module.exports = Diary;
