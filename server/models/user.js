const {connectDB, closeConnection} = require("../database");
const {genToken} = require("../jwtAuth");
const mongoDB = require("mongodb");
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
    closeConnection();
  }
  async validateUser() {
    try {
      const db = await connectDB();
      const result = await db.collection("users").findOne({username: this.username, password: this.password});
      if (result !== null) {
        this.id = result._id;
        this.token = await genToken(this.id);
        await db.collection("tokens").insertOne({token: this.token, userId: this.id, revoked: false});
        closeConnection();
        return true;
      } else {
        closeConnection();
        return false;
      }
    } catch (error) {
      closeConnection();
      console.error(error);
    }
  }

  async validateToken() {
    const db = await connectDB();
    const result = await db.collection("tokens").find({token: this.token, userId: this.id, revoked: false});
    closeConnection();
    if (result) {
      return true;
    }
  }
  async revokeToken() {
    const db = await connectDB();
    const result = await db
      .collection("tokens")
      .updateOne({token: this.token, userId: new mongoDB.ObjectId(this.id), revoked: false}, {$set: {revoked: true}});

    closeConnection();
    if (result.modifiedCount === 1) {
      return true;
    }
  }
}

module.exports = User;
