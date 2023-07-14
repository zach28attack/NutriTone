import Class from "./CommunityItem.module.css";

function CommunityItem({name, communityClickHandler, id}) {
  const clickHandler = () => {
    communityClickHandler(id);
  };
  return (
    <div className={Class.communityItem} onClick={clickHandler} id={id}>
      <img src="../../public/default-profile-picture1.jpg" />
      <span>{name}</span>
      <sub>joined</sub>
    </div>
  );
}

export default CommunityItem;
