import Class from "./Menu.module.css";
import {useState} from "react";
import CommunityItem from "./CommunityItem";
import Cookies from "js-cookie";

function Menu({setGroupPageIsActive, communities, isLoading, setActiveCommunityId, joinedCommunities}) {
  const communityClickHandler = (id) => {
    setGroupPageIsActive(true);
    setActiveCommunityId(id);
  };

  return (
    <aside className={Class.container}>
      <header>
        <img src="/default-profile-picture1.jpg" />
        <div className={Class.nameGroup}>
          {Cookies.get("name") && <span>{Cookies.get("name")}</span>}
          <sub>@{Cookies.get("username")}</sub>
        </div>
      </header>
      <section>
        <h3>Joined Communities </h3>
        <div className={Class.communityList}>
          {!isLoading &&
            joinedCommunities.map((community) => {
              return (
                <CommunityItem
                  communityClickHandler={communityClickHandler}
                  name={community.name}
                  key={community._id}
                  id={community._id}
                  joinedList={true}
                />
              );
            })}
        </div>
      </section>
      <section>
        <h3>Official Communities</h3>
        {!isLoading &&
          communities.map((community) => {
            return (
              <CommunityItem
                communityClickHandler={communityClickHandler}
                name={community.name}
                key={community._id}
                id={community._id}
                joinedList={false}
                joined={community.joined}
              />
            );
          })}
      </section>
    </aside>
  );
}

export default Menu;
