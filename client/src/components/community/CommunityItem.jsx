import Class from "./CommunityItem.module.css";

function CommunityItem({name, communityClickHandler}) {
  return (
    <div className={Class.communityItem} onClick={communityClickHandler}>
      <img src="../../public/default-profile-picture1.jpg" />
      <span>{name}</span>
      <sub>joined</sub>
    </div>
  );
}

export default CommunityItem;
