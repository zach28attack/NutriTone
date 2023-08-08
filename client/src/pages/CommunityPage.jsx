import {useState, useEffect} from "react";
import {getCommunities} from "../apis/communityApi";
import {getLikedPostIds, saveCommunityId, removeCommunityId} from "../apis/userApi";

import CommunityGroupPage from "./CommunityGroupPage";
import Class from "./CommunityPage.module.css";
import Post from "../components/community/Post";
import Menu from "../components/community/Menu";

function CommunityPage() {
  const [communities, setCommunities] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [groupPageIsActive, setGroupPageIsActive] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [activeCommunityId, setActiveCommunityId] = useState();
  const [likedPostIds, setLikedPostIds] = useState([]);

  //
  // Fetches community data, processes joined communities, and updates state.
  //
  const getAndSetCommunities = async () => {
    try {
      // Fetch communities data
      const res = await getCommunities();

      // Create an object of communities with their IDs as keys for faster access
      const communitiesObj = res.communities.reduce((obj, community) => {
        obj[community._id] = community;
        return obj;
      }, {});

      // Find joined communities based on their IDs and set the state in reverse order
      let joinedArr = [];
      for (let i = 0; i < res.joinedCommunities.length; i++) {
        joinedArr.push(communitiesObj[res.joinedCommunities[i].communityId]);
      }
      setJoinedCommunities(joinedArr.reverse());

      // Add a 'joined' field to each community object, indicating if the user has joined
      const joinedIds = res.joinedCommunities.map((community) => community.communityId);
      setCommunities(res.communities.map((community) => ({...community, joined: joinedIds.includes(community._id)})));

      // Set loading state to false after processing
      setIsLoading(false);
    } catch (error) {
      // Handle errors and set loading state to false
      console.error("An error occurred:", error);
      setIsLoading(false);
    }
  };

  const addCommunityPosts = (post, communityId) => {
    setCommunities((communities) =>
      communities.map((community) =>
        community._id === communityId ? {...community, posts: [...community.posts, post]} : community
      )
    );
  };
  const deleteCommunityPosts = (communityId, postId) => {
    setCommunities((communities) =>
      communities.map((community) => {
        return community._id === communityId
          ? {...community, posts: community.posts.filter((post) => post._id !== postId)}
          : community;
      })
    );
  };
  const updatePosts = (communityId, postId, updatedBody) => {
    setCommunities((communities) =>
      communities.map((community) =>
        community._id === communityId
          ? {
              ...community,
              posts: community.posts.map((post) => (post._id !== postId ? post : {...post, body: updatedBody})),
            }
          : community
      )
    );
  };

  // gets list of liked post ids
  const getAndSetLikedPostIds = async () => {
    setLikedPostIds(await getLikedPostIds());
  };

  useEffect(() => {
    getAndSetCommunities();
    getAndSetLikedPostIds();
  }, []);

  const joinCommunityHandler = (id) => {
    saveCommunityId(id);
    setCommunities(
      communities.map((community) => {
        if (community._id === id) {
          setJoinedCommunities((prevCommunities) => [...prevCommunities, community]);
          return {...community, joined: true};
        } else {
          return community;
        }
      })
    );
  };
  const leaveCommunityHandler = (id) => {
    removeCommunityId(id);
    setCommunities(
      communities.map((community) => {
        if (community._id === id) {
          setJoinedCommunities((prevCommunities) => prevCommunities.filter((community) => community._id !== id));
          return {...community, joined: false};
        } else {
          return community;
        }
      })
    );
  };

  return (
    <div className={Class.page}>
      {!groupPageIsActive ? (
        <div className={Class.feed}>
          <h1>Feed</h1>
          {!isLoading &&
            joinedCommunities.map((community) => {
              return community.posts.map((post) => (
                <Post
                  post={post}
                  groupName={community.name}
                  key={post._id}
                  id={post._id}
                  communityId={community._id}
                  deleteCommunityPosts={deleteCommunityPosts}
                  updatePosts={updatePosts}
                  likedPostIds={likedPostIds}
                  setLikedPostIds={setLikedPostIds}
                />
              ));
            })}
        </div>
      ) : (
        <CommunityGroupPage
          setGroupPageIsActive={setGroupPageIsActive}
          activeCommunityId={activeCommunityId}
          communities={communities}
          addCommunityPosts={addCommunityPosts}
          deleteCommunityPosts={deleteCommunityPosts}
          updatePosts={updatePosts}
          likedPostIds={likedPostIds}
          setLikedPostIds={setLikedPostIds}
        />
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
