import Class from "./CommunityPage.module.css";
import Post from "../components/community/Post";
import Menu from "../components/community/Menu";
import {useState, useEffect} from "react";
import {getJoinedCommunities} from "../apis/communityApi";
import CommunityGroupPage from "./CommunityGroupPage";

function CommunityPage() {
  const [joinedCommunities, setJoinedCommunities] = useState(true);
  const [groupPageIsActive, setGroupPageIsActive] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [activeCommunityId, setActiveCommunityId] = useState();

  const getAndSetCommunites = async () => {
    const joinedCommunities = await getJoinedCommunities();
    setJoinedCommunities(joinedCommunities);
    setIsLoading(false);
  };

  const addCommunityPosts = (post, communityId) => {
    setJoinedCommunities((communities) => {
      const updatedCommunities = communities.map((community) => {
        return community._id === communityId ? {...community, posts: [...community.posts, post]} : community;
      });
      return updatedCommunities;
    });
  };

  const deleteCommunityPosts = (communityId, postId) => {
    setJoinedCommunities((communities) => {
      const updatedCommunities = communities.map((community) => {
        return community._id === communityId
          ? {...community, posts: community.posts.filter((post) => post._id !== postId)}
          : community;
      });
      return updatedCommunities;
    });
  };

  useEffect(() => {
    getAndSetCommunites();
  }, []);

  return (
    <div className={Class.page}>
      {!groupPageIsActive ? (
        <div className={Class.feed}>
          <h1>Feed</h1>
          {!isLoading &&
            joinedCommunities.map((community) => {
              return community.posts
                .map((post) => (
                  <Post
                    post={post}
                    groupName={community.name}
                    key={post._id}
                    id={post._id}
                    communityId={community._id}
                    deleteCommunityPosts={deleteCommunityPosts}
                  />
                ))
                .reverse();
            })}
        </div>
      ) : (
        <CommunityGroupPage
          setGroupPageIsActive={setGroupPageIsActive}
          activeCommunityId={activeCommunityId}
          communities={joinedCommunities}
          updateCommunityPosts={addCommunityPosts}
          deleteCommunityPosts={deleteCommunityPosts}
        />
      )}
      <div className={Class.menu}>
        <Menu
          setGroupPageIsActive={setGroupPageIsActive}
          joinedCommunities={joinedCommunities}
          isLoading={isLoading}
          setActiveCommunityId={setActiveCommunityId}
        />
      </div>
    </div>
  );
}

export default CommunityPage;
