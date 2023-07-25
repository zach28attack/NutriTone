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
  }
  async saveNewPost() {
    const db = await connectDB();
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
  }
  async deletePost() {
    const db = await connectDB();
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
  }
  async updatePost() {
    const db = await connectDB();
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
  }
  async addLike() {
    const db = await connectDB();
    const findOneResult = await db.collection("communities").findOne({_id: new mongoDB.ObjectId(this.id)});
    if (findOneResult) {
      const post = findOneResult.posts.find((post) => post._id.toString() === this.post.id);
      const likes = post.likes ? post.likes : 0;
      const addLikeResult = await db
        .collection("communities")
        .updateOne(
          {_id: new mongoDB.ObjectId(this.id), "posts._id": new mongoDB.ObjectId(post._id)},
          {$set: {"posts.$.likes": likes + 1}}
        );
      // TODO: save post id to user's likedPostsIds document
    }
  }
}

module.exports = Community;
