const {connectDB} = require("../database");
const {genToken} = require("../jwtAuth");
class User {
  constructor(email, username, password, token, id) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.token = token;
    this.id = id;
  }

  async saveNew() {
    const db = await connectDB();
    const emailIsTaken = await db.collection("users").findOne({email: this.email});
    const usernameIsTaken = await db.collection("users").findOne({username: this.username});
    if (!emailIsTaken && !usernameIsTaken) {
      console.log("Saving new user:");
      try {
        const result = await db
          .collection("users")
          .insertOne({email: this.email, username: this.username, password: this.password});

        this.id = await result.insertedId;
        this.token = await genToken(this.id);
        await db.collection("tokens").insertOne({token: this.token, userId: this.id, revoked: false});
      } catch (error) {
        console.error(error);
      }
    }
  }
  async saveToken() {
    const db = await connectDB();
    const result = await db.collection("tokens").insertOne({token: this.token, userId: this.id, createdAt: new Date()});
    return result;
  }
  async validateToken() {
    const db = await connectDB();
    const result = await db.collection("tokens").find({token: this.token, userId: this.id});
  }
}

module.exports = User;
