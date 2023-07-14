import Class from "./CommunityGroupPage.module.css";
import Post from "../components/community/Post";
import {useEffect} from "react";
import {useState} from "react";

function CommunityGroupPage({setGroupPageIsActive, communities, activeCommunityId}) {
  // when communityItems are clicked in the menu call getCommunityPosts, get 10-20 posts
  // when user scrolls to bottom of page get more posts from db

  const [community, setCommunity] = useState(false);
  const getPosts = () => {
    const [community] = communities.filter((community) => community._id === activeCommunityId);
    setCommunity(community);
  };

  const navClickHandler = () => {
    setGroupPageIsActive(false);
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className={Class.container}>
      <button onClick={navClickHandler}>go back</button>
      <h1>{community.name}</h1>
      {community &&
        community.posts.map((post) => (
          <Post post={post} groupName={community.name} key={`${post.userId} ${post.date}`} />
        ))}
    </div>
  );
}

export default CommunityGroupPage;
