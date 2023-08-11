import {createContext, useState, useEffect} from "react";
import Cookies from "js-cookie";
import {getCommunities} from "../apis/communityApi";
import {saveCommunityId, removeCommunityId, getLikedPostIds} from "../apis/userApi";

export const GlobalContext = createContext();

export function GlobalContextProvider(props) {
  const [date, setDate] = useState("...");
  const [communities, setCommunities] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [likedPostIds, setLikedPostIds] = useState([]);

  const sortPosts = (joinedCommunities) => {
    // sort Posts from newest from the joinedCommunities instance var.
    const unsortedPosts = [];
    joinedCommunities.forEach((community) => {
      unsortedPosts.push(...community.posts);
    });
    setPosts(unsortedPosts.sort((a, b) => new Date(a.date) - new Date(b.date)).reverse());
  };

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
      setJoinedCommunities(joinedArr);
      // Add a 'joined' field to each community object, indicating if the user has joined
      const joinedIds = res.joinedCommunities.map((community) => community.communityId);
      setCommunities(res.communities.map((community) => ({...community, joined: joinedIds.includes(community._id)})));

      // sort posts in joinedCommunites by date
      sortPosts(joinedArr);

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
    setJoinedCommunities((communities) => {
      const joinedArr = communities.map((community) =>
        community._id === communityId ? {...community, posts: [...community.posts, post]} : community
      );
      sortPosts(joinedArr);
      return joinedArr;
    });
  };

  const deleteCommunityPosts = (communityId, postId) => {
    setCommunities((communities) =>
      communities.map((community) => {
        return community._id === communityId
          ? {...community, posts: community.posts.filter((post) => post._id !== postId)}
          : community;
      })
    );
    setJoinedCommunities((communities) => {
      const joinedArr = communities.map((community) => {
        return community._id === communityId
          ? {...community, posts: community.posts.filter((post) => post._id !== postId)}
          : community;
      });
      sortPosts(joinedArr);
      return joinedArr;
    });
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
    setJoinedCommunities((communities) => {
      const joinedArr = communities.map((community) =>
        community._id === communityId
          ? {
              ...community,
              posts: community.posts.map((post) => (post._id !== postId ? post : {...post, body: updatedBody})),
            }
          : community
      );
      sortPosts(joinedArr);
      return joinedArr;
    });
  };

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

  // gets list of liked post ids
  const getAndSetLikedPostIds = async () => {
    setLikedPostIds(await getLikedPostIds());
  };

  useEffect(() => {
    const dayDate = Cookies.get("dayDate");
    if (dayDate) {
      const year = new Date().getFullYear();
      const date = new Date(year, 0, dayDate).toLocaleDateString();
      setDate(date);
    }
    getAndSetCommunities();

    // get list of users liked posts
    getAndSetLikedPostIds();
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        date,
        setDate,
        updatePosts,
        deleteCommunityPosts,
        addCommunityPosts,
        joinCommunityHandler,
        leaveCommunityHandler,
        communities,
        joinedCommunities,
        isLoading,
        getAndSetCommunities,
        posts,
        likedPostIds,
        setLikedPostIds,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}