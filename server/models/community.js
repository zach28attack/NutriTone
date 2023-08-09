const {dbConnection} = require("../database");
const mongoDB = require("mongodb");
class Community {
  constructor(id, name, userId, post, posts) {
    this.id = id;
    this.name = name;
    this.userId = userId;
    this.post = post;
    this.posts = posts;
  }
  async getCommunities() {
    const db = await dbConnection();
    try {
      const user = await db.collection("users").findOne({_id: new mongoDB.ObjectId(this.userId)});
      const result = await db.collection("communities").find().toArray();
      if (result) {
        return [user, result];
      }
    } catch (error) {
      console.error("getJoinedCommunities() error:", error);
    }
  }
  async saveNewPost() {
    const db = await dbConnection();
    try {
      const result = await db.collection("communities").updateOne(
        {_id: new mongoDB.ObjectId(this.id)},
        {
          $push: {
            posts: this.post,
          },
        }
      );

      if (result.modifiedCount === 1) {
        return true;
      }
    } catch (error) {
      console.error("saveNewPost() error:", error);
    }
  }
  async deletePost() {
    const db = await dbConnection();
    try {
      const result = await db.collection("communities").updateOne(
        {_id: new mongoDB.ObjectId(this.id)},
        {
          $pull: {
            posts: {_id: new mongoDB.ObjectId(this.post.id)},
          },
        }
      );

      if (result.modifiedCount === 1) {
        return true;
      }
    } catch (error) {
      console.error("deletePost() error:", error);
    }
  }
  async updatePost() {
    const db = await dbConnection();
    try {
      const result = await db.collection("communities").updateOne(
        {_id: new mongoDB.ObjectId(this.id), "posts._id": new mongoDB.ObjectId(this.post.id)},
        {
          $set: {
            "posts.$.body": this.post.body,
          },
        }
      );

      if (result.modifiedCount > 0) {
        return true;
      } else {
        return true;
      }
    } catch (error) {
      console.error("updatePost() error:", error);
    }
  }
  async addLike() {
    const db = await dbConnection();
    try {
      const result = await db
        .collection("communities")
        .updateOne(
          {_id: new mongoDB.ObjectId(this.id), "posts._id": new mongoDB.ObjectId(this.post.id)},
          {$inc: {"posts.$.likes": 1}}
        );

      if (result.modifiedCount === 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("addLike() error:", error);
    }
  }
  async removeLike() {
    try {
      const db = await dbConnection();
      const result = await db
        .collection("communities")
        .updateOne(
          {_id: new mongoDB.ObjectId(this.id), "posts._id": new mongoDB.ObjectId(this.post.id)},
          {$inc: {"posts.$.likes": -1}}
        );

      if (result.modifiedCount === 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("removeLike() error:", error);
    }
  }
}

module.exports = Community;
