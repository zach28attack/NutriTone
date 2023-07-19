import Class from "./CommunityGroupPage.module.css";
import Post from "../components/community/Post";
import {useEffect} from "react";
import {useState} from "react";
import PostForm from "../components/community/PostForm";

function CommunityGroupPage({
  setGroupPageIsActive,
  communities,
  activeCommunityId,
  updateCommunityPosts,
  deleteCommunityPosts,
}) {
  // TODO:
  // when communityItems are clicked in the menu call getCommunityPosts, get 10-20 posts
  // when user scrolls to bottom of page get more posts from db

  const [community, setCommunity] = useState(false);
  const [posts, setPosts] = useState();

  const getPosts = () => {
    const [community] = communities.filter((community) => community._id === activeCommunityId);
    setCommunity(community);
    setPosts([...community.posts].reverse());
  };

  const navClickHandler = () => {
    setGroupPageIsActive(false);
  };
  const deleteClickHandler = (comunityId, id) => {
    deleteCommunityPosts(comunityId, id);
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
  };

  useEffect(() => {
    getPosts();
  }, [activeCommunityId]);

  return (
    <div className={Class.container}>
      <button onClick={navClickHandler}>go back</button>
      <h1>{community.name}</h1>
      <PostForm communityId={community._id} setPosts={setPosts} updateCommunityPosts={updateCommunityPosts} />
      {community &&
        posts.map((post) => (
          <Post
            post={post}
            groupName={community.name}
            key={post._id}
            communityId={community._id}
            id={post._id}
            deleteCommunityPosts={deleteClickHandler}
          />
        ))}
    </div>
  );
}

export default CommunityGroupPage;
