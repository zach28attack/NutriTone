const {connectDB, closeConnection} = require("../database");
const mongoDB = require("mongodb");
class Community {
  constructor(id, name, userId, post, posts) {
    this.id = id;
    this.name = name;
    this.userId = userId;
    this.post = post;
    this.posts = posts;
  }
  async getJoinedCommunities() {
    const db = await connectDB();
    try {
      const userResult = await db.collection("users").findOne({_id: new mongoDB.ObjectId(this.userId)});
      if (userResult) {
        const communityIds = userResult.joinedCommunities.map(
          (communitiy) => new mongoDB.ObjectId(communitiy.communityId)
        );
        const communitiesResult = await db
          .collection("communities")
          .find({_id: {$in: communityIds}})
          .toArray();
        closeConnection();
        return communitiesResult;
      }
      closeConnection();
      return false;
    } catch (error) {
      console.error("getJoinedCommunities() error:", error);
    }
  }
  async saveNewPost() {
    const db = await connectDB();
    try {
      const result = await db.collection("communities").updateOne(
        {_id: new mongoDB.ObjectId(this.id)},
        {
          $push: {
            posts: this.post,
          },
        }
      );
      closeConnection();
      if (result.modifiedCount === 1) {
        return true;
      }
    } catch (error) {
      console.error("saveNewPost() error:", error);
    }
  }
  async deletePost() {
    const db = await connectDB();
    try {
      const result = await db.collection("communities").updateOne(
        {_id: new mongoDB.ObjectId(this.id)},
        {
          $pull: {
            posts: {_id: new mongoDB.ObjectId(this.post.id)},
          },
        }
      );
      closeConnection();
      if (result.modifiedCount === 1) {
        return true;
      }
    } catch (error) {
      console.error("deletePost() error:", error);
    }
  }
  async updatePost() {
    const db = await connectDB();
    try {
      const result = await db.collection("communities").updateOne(
        {_id: new mongoDB.ObjectId(this.id), "posts._id": new mongoDB.ObjectId(this.post.id)},
        {
          $set: {
            "posts.$.body": this.post.body,
          },
        }
      );
      closeConnection();
      if (result.modifiedCount > 0) {
        return true;
      }
    } catch (error) {
      console.error("updatePost() error:", error);
    }
  }
  async addLike() {
    const db = await connectDB();
    try {
      const findOneResult = await db.collection("communities").findOne({_id: new mongoDB.ObjectId(this.id)});
      if (findOneResult) {
        const post = findOneResult.posts.find((post) => post._id.toString() === this.post.id);
        const addLikeResult = await db
          .collection("communities")
          .updateOne(
            {_id: new mongoDB.ObjectId(this.id), "posts._id": new mongoDB.ObjectId(post._id)},
            {$inc: {"posts.$.likes": 1}}
          );
        closeConnection();
      }
    } catch (error) {
      console.error("addLike() error:", error);
    }
  }
}

module.exports = Community;
