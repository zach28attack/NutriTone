import Class from "./CommunityPage.module.css";
import Post from "../components/community/Post";
import Menu from "../components/community/Menu";
import {useState, useEffect} from "react";
import {Outlet} from "react-router-dom";
import {getJoinedCommunities} from "../apis/communityApi";

function CommunityPage() {
  const [joinedCommunities, setJoinedCommunities] = useState(true);
  const [activeCommunity, setActiveCommunity] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getAndSetCommunites = async () => {
    const joinedCommunities = await getJoinedCommunities();
    setJoinedCommunities(joinedCommunities);
    setIsLoading(false);
  };

  useEffect(() => {
    getAndSetCommunites();
  }, []);
  return (
    <div className={Class.page}>
      {!activeCommunity ? (
        <div className={Class.feed}>
          <h1>Feed</h1>
          {!isLoading &&
            joinedCommunities.map((community) => {
              return community.posts.map((post) => <Post post={post} groupName={community.name} />);
            })}
        </div>
      ) : (
        <Outlet />
      )}
      <div className={Class.menu}>
        <Menu setActiveCommunity={setActiveCommunity} joinedCommunities={joinedCommunities} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default CommunityPage;
