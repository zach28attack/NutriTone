import Class from "./CommunityItem.module.css";

function CommunityItem({name}) {
  return (
    <div className={Class.communityItem}>
      <img src="../../public/default-profile-picture1.jpg" />
      <span>{name}</span>
      <sub>joined</sub>
    </div>
  );
}

export default CommunityItem;
