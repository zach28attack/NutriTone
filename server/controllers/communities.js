const Community = require("../models/community");
const mongoDB = require("mongodb");

exports.getCommunities = async (req, res, next) => {
  //TODO: limit joinedCommunities array to the most recent 10-20 posts and get more as user scrolls down page

  const community = new Community();
  const user = req.user;
  community.userId = user.id;
  try {
    const [user, result] = await community.getCommunities();
    if (result) {
      res.status(200).json({
        joinedCommunities: user.joinedCommunities,
        communities: result,
      });
    } else {
      res.status(400).json();
    }
  } catch (error) {
    console.error(error);
  }
};

exports.saveNewPost = async (req, res, next) => {
  try {
    const community = new Community();
    const {post, id} = req.body;
    community.id = id;
    post.userId = req.user.id;
    post._id = new mongoDB.ObjectId();
    community.post = post;

    const success = await community.saveNewPost();
    if (success) {
      res.status(200).json({
        postId: post._id,
      });
    } else {
      res.status(400).json();
    }
  } catch (error) {
    console.error(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const community = new Community();
    const post = {id: req.params.postId};
    community.post = post;
    community.id = req.params.communityId;
    const success = await community.deletePost();
    if (success) {
      res.status(200).json();
    } else {
      res.status(400).json();
    }
  } catch (error) {
    console.error(error);
  }
};

exports.updatePost = async (req, res, next) => {
  const community = new Community();
  const body = req.body.updatedBody;
  const post = {body: body, id: req.params.postId};
  community.post = post;
  community.id = req.params.communityId;
  try {
    const success = await community.updatePost();
    if (success) {
      res.status(200).json();
    } else {
      res.status(400).json();
    }
  } catch (error) {
    console.error(error);
  }
};

exports.addLike = (req, res, next) => {
  const community = new Community();
  community.id = req.body.communityId;
  const post = {id: req.body.postId};
  community.post = post;
  community.addLike();
  next();
};

exports.removeLike = (req, res, next) => {
  const community = new Community();
  community.id = req.params.communityId;
  const post = {id: req.params.postId};
  community.post = post;
  community.removeLike();
  next();
};
