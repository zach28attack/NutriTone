import Class from "./CommunityPage.module.css";
import Post from "../components/community/Post";
import Menu from "../components/community/Menu";
import {useState, useEffect} from "react";
import {getCommunities} from "../apis/communityApi";
import CommunityGroupPage from "./CommunityGroupPage";
import {getLikedPostIds, saveCommunityId, removeCommunityId} from "../apis/userApi";

function CommunityPage() {
  const [communities, setCommunities] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [groupPageIsActive, setGroupPageIsActive] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [activeCommunityId, setActiveCommunityId] = useState();
  const [likedPostIds, setLikedPostIds] = useState([]);

  const getAndSetCommunites = async () => {
    const res = await getCommunities();

    // find joined communities with a time complexity of O(n)
    let joinedArr = [];
    let communitiesObj = {};
    res.communities.forEach((community) => {
      communitiesObj[community._id] = community;
    });
    for (let i = 0; i < res.joinedCommunities.length; i++) {
      joinedArr.push(communitiesObj[res.joinedCommunities[i].communityId]);
    }
    setJoinedCommunities(joinedArr.reverse());

    // add a joined field to each community obj, set true if joined
    const joinedIds = res.joinedCommunities.map((community) => community.communityId);
    setCommunities(res.communities.map((community) => ({...community, joined: joinedIds.includes(community._id)})));

    setIsLoading(false);
  };

  const addCommunityPosts = (post, communityId) => {
    setCommunities((communities) => {
      const updatedCommunities = communities.map((community) => {
        return community._id === communityId ? {...community, posts: [...community.posts, post]} : community;
      });
      return updatedCommunities;
    });
  };
  const deleteCommunityPosts = (communityId, postId) => {
    setCommunities((communities) => {
      const updatedCommunities = communities.map((community) => {
        return community._id === communityId
          ? {...community, posts: community.posts.filter((post) => post._id !== postId)}
          : community;
      });
      return updatedCommunities;
    });
  };
  const updatePosts = (communityId, postId, updatedBody) => {
    setCommunities((communities) => {
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
