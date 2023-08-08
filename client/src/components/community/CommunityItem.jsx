import Class from "./CommunityItem.module.css";

function CommunityItem({name, communityClickHandler, id, joinedList, joined, joinCommunity, leaveCommunity}) {
  const clickHandler = () => {
    communityClickHandler(id);
  };
  const joinCommunityHandler = () => {
    joinCommunity(id);
  };
  const leaveCommunityHandler = () => {
    leaveCommunity(id);
  };
  return (
    <div className={Class.communityItem} id={id}>
      <span onClick={clickHandler}>{name}</span>
      {joinedList ? (
        <button onClick={leaveCommunityHandler}>leave</button>
      ) : joined ? (
        <sub>joined</sub>
      ) : (
        <button onClick={joinCommunityHandler}>Join</button>
      )}
    </div>
  );
}

export default CommunityItem;
