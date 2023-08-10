import {useState, useEffect, useContext} from "react";
import {GlobalContext} from "../context/GlobalContext";

import CommunityGroupPage from "./CommunityGroupPage";
import Class from "./CommunityPage.module.css";
import Post from "../components/community/Post";
import Menu from "../components/community/Menu";

function CommunityPage() {
  const [groupPageIsActive, setGroupPageIsActive] = useState();
  const [activeCommunityId, setActiveCommunityId] = useState();

  const {joinCommunityHandler, leaveCommunityHandler, communities, joinedCommunities, isLoading, posts} =
    useContext(GlobalContext);

  const [postsArr, setPostsArr] = useState([]);
  useEffect(() => {
    setPostsArr(posts);
    console.log("loggin yeehhhh");
  }, [posts]);
  return (
    <div className={Class.page}>
      {!groupPageIsActive ? (
        <div className={Class.feed}>
          <h1>Feed</h1>
          {!isLoading &&
            postsArr.map((post) => (
              <Post
                post={post}
                groupName={post.communityName}
                key={post._id}
                id={post._id}
                communityId={post.communityId}
              />
            ))}
        </div>
      ) : (
        <CommunityGroupPage setGroupPageIsActive={setGroupPageIsActive} activeCommunityId={activeCommunityId} />
      )}
      <div className={Class.menu}>
        <Menu
          setGroupPageIsActive={setGroupPageIsActive}
          joinedCommunities={joinedCommunities}
          communities={communities}
          isLoading={isLoading}
          setActiveCommunityId={setActiveCommunityId}
          joinCommunity={joinCommunityHandler}
          leaveCommunity={leaveCommunityHandler}
        />
      </div>
    </div>
  );
}

export default CommunityPage;
