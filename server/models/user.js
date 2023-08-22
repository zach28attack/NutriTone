const {dbConnection} = require("../database");
const {genToken} = require("../jwtAuth");
const mongoDB = require("mongodb");
class User {
  constructor(email, username, password, token, id, log, likedPostId, communityId, budget, profilePic, newPassword) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.newPassword = newPassword;
    this.token = token;
    this.id = id;
    this.log = log;
    this.likedPostId = likedPostId;
    this.communityId = communityId;
    this.budget = budget;
    this.profilePic = profilePic;
  }

  async saveNew() {
    try {
      const db = await dbConnection();
      const emailIsTaken = await db.collection("users").findOne({email: this.email});
      const usernameIsTaken = await db.collection("users").findOne({username: this.username});
      if (!emailIsTaken && !usernameIsTaken) {
        const result = await db
          .collection("users")
          .insertOne({email: this.email, username: this.username, password: this.password});

        this.id = await result.insertedId;
        this.token = genToken(this.id);
        await db.collection("tokens").insertOne({token: this.token, userId: this.id, revoked: false});
      }
    } catch (error) {
      console.error(error);
    }
  }
  async updateUser() {
    try {
      const db = await dbConnection();
      const result = await db
        .collection("users")
        .updateOne({_id: new mongoDB.ObjectId(this.id)}, {$set: {name: this.name, username: this.username}});
      if (result.modifiedCount === 1) return true;
      else return false;
    } catch (error) {
      console.error(error);
    }
  }
  async updateEmail() {
    try {
      const db = await dbConnection();
      const result = await db
        .collection("users")
        .updateOne({_id: new mongoDB.ObjectId(this.id), password: this.password}, {$set: {email: this.email}});
      if (result.modifiedCount === 1) return true;
      else return false;
    } catch (error) {
      console.error(error);
    }
  }
  async updatePassword() {
    try {
      const db = await dbConnection();
      const result = await db
        .collection("users")
        .updateOne(
          {_id: new mongoDB.ObjectId(this.id), password: this.password.toString()},
          {$set: {password: this.newPassword}}
        );
      if (result.modifiedCount === 1) return true;
      else return false;
    } catch (error) {
      console.error(error);
    }
  }
  async validateUser() {
    try {
      const db = await dbConnection();
      const result = await db.collection("users").findOne({username: this.username, password: this.password});
      if (result !== null) {
        this.id = result._id;
        this.username = result.username;
        this.email = result.email;
        result.name ? (this.name = result.name) : undefined;
        this.token = await genToken(this.id);
        await db.collection("tokens").insertOne({token: this.token, userId: this.id, revoked: false});
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async validateToken() {
    try {
      const db = await dbConnection();
      const result = await db.collection("tokens").find({token: this.token, userId: this.id, revoked: false});

      if (result) {
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async revokeToken() {
    try {
      const db = await dbConnection();
      const result = await db
        .collection("tokens")
        .updateOne({token: this.token, userId: new mongoDB.ObjectId(this.id), revoked: false}, {$set: {revoked: true}});

      if (result.modifiedCount === 1) {
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getLogs() {
    try {
      const db = await dbConnection();
      const result = await db.collection("users").findOne({_id: new mongoDB.ObjectId(this.id)});
      if (result) {
        return result.logs ? result.logs : [];
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async saveNewLog() {
    try {
      const db = await dbConnection();
      const result = await db.collection("users").updateOne(
        {_id: new mongoDB.ObjectId(this.id)},
        {
          $push: {logs: this.log},
        }
      );
      if (result.modifiedCount === 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async deleteLog() {
    try {
      const db = await dbConnection();
      const result = await db
        .collection("users")
        .updateOne({_id: new mongoDB.ObjectId(this.id)}, {$pull: {logs: this.log}});
      if (result.modifiedCount === 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async saveLikedPostId() {
    try {
      const db = await dbConnection();
      const likedPost = await db
        .collection("users")
        .findOne({_id: new mongoDB.ObjectId(this.id), likedPosts: new mongoDB.ObjectId(this.likedPostId)});

      if (!likedPost) {
        const result = await db
          .collection("users")
          .updateOne(
            {_id: new mongoDB.ObjectId(this.id)},
            {$push: {likedPosts: new mongoDB.ObjectId(this.likedPostId)}}
          );
        if (result.modifiedCount === 1) {
          return true;
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  async removeLikedPostId() {
    try {
      const db = await dbConnection();
      const result = await db
        .collection("users")
        .updateOne({_id: new mongoDB.ObjectId(this.id)}, {$pull: {likedPosts: new mongoDB.ObjectId(this.likedPostId)}});
    } catch (error) {
      console.error(error);
    }
  }
  async getLikedPostIds() {
    try {
      const db = await dbConnection();
      const result = await db.collection("users").findOne({_id: new mongoDB.ObjectId(this.id)});
      return result.likedPosts;
    } catch (error) {
      console.error(error);
    }
  }
  async saveCommunityId() {
    try {
      const db = await dbConnection();
      const result = await db
        .collection("users")
        .updateOne(
          {_id: new mongoDB.ObjectId(this.id)},
          {$push: {joinedCommunities: {communityId: new mongoDB.ObjectId(this.communityId)}}}
        );
      if (result.modifiedCount === 1) {
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async removeCommunityId() {
    try {
      const db = await dbConnection();
      const result = await db
        .collection("users")
        .updateOne(
          {_id: new mongoDB.ObjectId(this.id)},
          {$pull: {joinedCommunities: {communityId: new mongoDB.ObjectId(this.communityId)}}}
        );
      if (result.modifiedCount === 1) {
        return true;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async getBudget() {
    try {
      const db = await dbConnection();
      const result = await db.collection("users").findOne({_id: new mongoDB.ObjectId(this.id)});
      if (result) {
        return result.budget;
      } else return false;
    } catch (error) {
      console.error(error);
    }
  }
  async updateBudget() {
    try {
      const db = await dbConnection();
      const result = await db
        .collection("users")
        .updateOne({_id: new mongoDB.ObjectId(this.id)}, {$set: {budget: parseInt(this.budget)}});
      if (result.modifiedCount === 1) {
        return true;
      } else return false;
    } catch (error) {
      console.error(error);
    }
  }
  async getImage() {
    try {
      const db = await dbConnection();
      const result = await db.collection("users").findOne({_id: new mongoDB.ObjectId(this.id)});
      if (!result) return false;
      return result.profilePic;
    } catch (error) {}
  }
  async getCompressedtImage() {
    try {
      const db = await dbConnection();
      const result = await db.collection("users").findOne({_id: new mongoDB.ObjectId(this.id)});
      if (!result) return false;
      return result.compressedImageData;
    } catch (error) {}
  }
  async uploadImage() {
    try {
      const db = await dbConnection();
      if (this.profilePic !== undefined) {
        const result = await db
          .collection("users")
          .updateOne({_id: new mongoDB.ObjectId(this.id)}, {$set: {profilePic: this.profilePic}});
        if (result.modifiedCount === 1) return true;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async uploadCompressedImage() {
    try {
      const db = await dbConnection();
      if (this.profilePic !== undefined) {
        const result = await db
          .collection("users")
          .updateOne({_id: new mongoDB.ObjectId(this.id)}, {$set: {compressedImageData: this.profilePic}});
        console.log(result);
        if (result.modifiedCount === 1) return true;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = User;
