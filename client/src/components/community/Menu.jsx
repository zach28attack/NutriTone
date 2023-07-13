import Class from "./Menu.module.css";
import {VscSearch} from "react-icons/vsc";
import {useNavigate} from "react-router-dom";

function Menu({setActiveCommunity}) {
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
          <div className={Class.communityItem} onClick={communityClickHandler}>
            <img src="../../public/default-profile-picture1.jpg" />
            <span>[Group Name test]</span>
            <sub>joined</sub>
          </div>
          <div className={Class.communityItem} onClick={communityClickHandler}>
            <img src="../../public/default-profile-picture1.jpg" />
            <span>[Group Name]</span>
            <sub>joined</sub>
          </div>
        </div>
      </section>
      <section>
        <form className={Class.form}>
          <VscSearch className={Class.search} />
          <input type="text" />
        </form>
        <div className={Class.communityList}>
          <div className={Class.communityItem}>
            <img src="../../public/default-profile-picture1.jpg" onClick={communityClickHandler} />
            <span onClick={communityClickHandler}>[Group Name test]</span>
            <button>join</button>
          </div>
          <div className={Class.communityItem}>
            <img src="../../public/default-profile-picture1.jpg" />
            <span>[Group Name]</span>
            <button>join</button>
          </div>
        </div>
      </section>
    </aside>
  );
}

export default Menu;
