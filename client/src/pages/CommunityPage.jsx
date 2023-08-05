import Class from "./CommunityPage.module.css";
import Post from "../components/community/Post";
import Menu from "../components/community/Menu";
import {useState, useEffect} from "react";
import {getJoinedCommunities} from "../apis/communityApi";
import CommunityGroupPage from "./CommunityGroupPage";
import {getLikedPostIds} from "../apis/userApi";

function CommunityPage() {
  const [joinedCommunities, setJoinedCommunities] = useState(true);
  const [groupPageIsActive, setGroupPageIsActive] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [activeCommunityId, setActiveCommunityId] = useState();
  const [likedPostIds, setLikedPostIds] = useState([]);

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
  const updatePosts = (communityId, postId, updatedBody) => {
    setJoinedCommunities((communities) => {
      return communities.map((community) => {
        return community._id === communityId
          ? {
              ...community,
              posts: community.posts.map((post) => (post._id !== postId ? post : {...post, body: updatedBody})),
            }
          : community;
      });
    });
  };

  // gets list of liked post ids
  const getAndSetLikedPostIds = async () => {
    setLikedPostIds(await getLikedPostIds());
  };
  useEffect(() => {
    getAndSetCommunites();
    getAndSetLikedPostIds();
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
                    updatePosts={updatePosts}
                    likedPostIds={likedPostIds}
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
          addCommunityPosts={addCommunityPosts}
          deleteCommunityPosts={deleteCommunityPosts}
          updatePosts={updatePosts}
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
