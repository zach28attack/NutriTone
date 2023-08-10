import Class from "./CommunityItem.module.css";
import {useContext} from "react";
import {GlobalContext} from "../../context/GlobalContext";

function CommunityItem({name, communityClickHandler, id, joinedList, joined}) {
  const {leaveCommunityHandler, joinCommunityHandler} = useContext(GlobalContext);
  const clickHandler = () => {
    communityClickHandler(id);
  };
  const joinHandler = () => {
    joinCommunityHandler(id);
  };
  const leaveHandler = () => {
    leaveCommunityHandler(id);
  };
  return (
    <div className={Class.communityItem} id={id}>
      <span onClick={clickHandler}>{name}</span>
      {joinedList ? (
        <button onClick={leaveHandler}>leave</button>
      ) : joined ? (
        <sub>joined</sub>
      ) : (
        <button onClick={joinHandler}>Join</button>
      )}
    </div>
  );
}

export default CommunityItem;
