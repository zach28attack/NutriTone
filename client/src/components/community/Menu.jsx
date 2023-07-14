import Class from "./Menu.module.css";
import {VscSearch} from "react-icons/vsc";
import {useNavigate} from "react-router-dom";
import {getJoinedCommunities} from "../../apis/communityApi";
import {useEffect, useState} from "react";
import CommunityItem from "./CommunityItem";

function Menu({setActiveCommunity, joinedCommunities, isLoading}) {
  const navigate = useNavigate();
  const communityClickHandler = () => {
    setActiveCommunity(true); // replace with community ObjectId
    navigate("/community/page");
  };

  return (
    <aside className={Class.container}>
      <header>
        <div className={Class.nameGroup}>
          <span>Zachary Casares</span>
          <sub>@user2323432</sub>
        </div>
        <img src="../../public/default-profile-picture1.jpg" />
      </header>
      <section>
        <h3>Joined Communities</h3>
        <div className={Class.communityList}>
          {!isLoading &&
            joinedCommunities.map((community) => {
              return (
                <CommunityItem
                  communityClickHandler={communityClickHandler}
                  name={community.name}
                  key={community._id}
                />
              );
            })}
        </div>
      </section>
      <section>
        <form className={Class.form}>
          <VscSearch className={Class.search} />
          <input type="text" />
        </form>
        <div className={Class.communityList}>
          {/* {joinedCommunities.map((community) => {
            <CommunityItem onClick={communityClickHandler} community={community} />;
          })} */}
        </div>
      </section>
    </aside>
  );
}

export default Menu;
