const Community = require("../models/community");

exports.getJoinedCommunities = async (req, res, next) => {
  //TODO: limit joinedCommunities array to the most recent 10-20 posts and get more as user scrolls down page

  const community = new Community();
  const user = req.user;
  community.userId = user.id;
  try {
    const joinedCommunities = await community.getJoinedCommunities();
    if (joinedCommunities) {
      res.status(200).json({
        communities: joinedCommunities,
      });
    } else {
      res.status(400).json();
    }
  } catch (error) {
    console.error(error);
  }
};

exports.saveNewPost = async (req, res, next) => {
  const community = new Community();
  const {post} = req.body;
  console.log(post);
  // community.post = post;
};
