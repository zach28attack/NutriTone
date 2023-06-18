const {connectDB} = require("../database");

class User {
  constructor(email, username, password) {
    this.email = email;
    this.username = username;
    this.password = password;
  }

  async saveNew() {
    const db = await connectDB();
    const emailIsTaken = await db.collection("users").findOne({email: this.email});
    if (!emailIsTaken) {
      console.log("Saving new user:");
      try {
        const result = await db
          .collection("users")
          .insertOne({email: this.email, username: this.username, password: this.password});

        return result;
      } catch (error) {
        console.error(error);
      }
    }
  }
}

module.exports = User;
