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
}

module.exports = Community;
