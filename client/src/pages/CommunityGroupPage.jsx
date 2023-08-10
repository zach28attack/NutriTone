import Class from "./CommunityGroupPage.module.css";
import Post from "../components/community/Post";
import {useEffect} from "react";
import {useState, useContext} from "react";
import PostForm from "../components/community/PostForm";
import {GlobalContext} from "../context/GlobalContext";

function CommunityGroupPage({setGroupPageIsActive, activeCommunityId, likedPostIds, setLikedPostIds}) {
  const {communities} = useContext(GlobalContext);
  const [community, setCommunity] = useState(false);
  const [posts, setPosts] = useState();

  const navClickHandler = () => {
    setGroupPageIsActive(false);
  };

  useEffect(() => {
    const [community] = communities.filter((community) => community._id === activeCommunityId);
    setCommunity(community);
    setPosts([...community.posts].reverse());
  }, [activeCommunityId, communities]);

  return (
    <div className={Class.container}>
      <button onClick={navClickHandler} className={Class.returnBtn}>
        go back
      </button>
      <h1>{community.name}</h1>
      <PostForm community={community} setPosts={setPosts} />
      {community &&
        posts.map((post) => (
          <Post
            post={post}
            groupName={community.name}
            key={post._id}
            communityId={community._id}
            id={post._id}
            likedPostIds={likedPostIds}
            setLikedPostIds={setLikedPostIds}
          />
        ))}
    </div>
  );
}

export default CommunityGroupPage;
