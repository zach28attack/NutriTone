import Class from "./Menu.module.css";
import {VscSearch} from "react-icons/vsc";
import {useEffect, useState} from "react";
import CommunityItem from "./CommunityItem";
import Cookies from "js-cookie";
import {PiListPlusLight} from "react-icons/pi";

function Menu({setGroupPageIsActive, joinedCommunities, isLoading, setActiveCommunityId}) {
  const communityClickHandler = (id) => {
    setGroupPageIsActive(true);
    setActiveCommunityId(id);
  };

  return (
    <aside className={Class.container}>
      <header>
        <img src="../../public/default-profile-picture1.jpg" />
        <div className={Class.nameGroup}>
          {Cookies.get("name") && <span>{Cookies.get("name")}</span>}
          <sub>@{Cookies.get("username")}</sub>
        </div>
      </header>
      <section>
        <h3>
          Joined Communities <PiListPlusLight className={Class.addCommunityBtn} />
        </h3>
        <div className={Class.communityList}>
          {!isLoading &&
            joinedCommunities.map((community) => {
              return (
                <CommunityItem
                  communityClickHandler={communityClickHandler}
                  name={community.name}
                  key={community._id}
                  id={community._id}
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
          {/* list of featured communities / search results */}
          {/* {joinedCommunities.map((community) => {
            <CommunityItem onClick={communityClickHandler} community={community} />;
          })} */}
        </div>
      </section>
    </aside>
  );
}

export default Menu;
