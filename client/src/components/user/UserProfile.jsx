import Class from "./UserProfile.module.css";
import {PiPencilFill} from "react-icons/pi";
import {useState} from "react";
import {BiDotsVerticalRounded} from "react-icons/bi";
import AccountModal from "../user/AccountModal";
import ProfileSummary from "./ProfileSummary";

function UserProfile() {
  const [nameIsActive, setNameIsActive] = useState();
  const [usernameIsActive, setUsernameIsActive] = useState();
  const [accountModalIsActive, setAccountModalIsActive] = useState();

  const enterHandler = (e) => {
    if (e.target.closest("#name")) {
      setNameIsActive(true);
    } else if (e.target.closest("#username")) {
      setUsernameIsActive(true);
    }
  };
  const outHandler = (e) => {
    if (e.target.closest("#name")) {
      setNameIsActive(false);
    } else if (e.target.closest("#username")) {
      setUsernameIsActive(false);
    }
  };
  const accountClickHandler = () => {
    setAccountModalIsActive(!accountModalIsActive);
  };

  return (
    <section className={Class.container}>
      <article className={Class.profile}>
        <img src="../../public/default-profile-picture1.jpg" alt="" />
        <div className={Class.nameGroup}>
          <div className={Class.nameContainer} onMouseOver={enterHandler} onMouseOut={outHandler} id="name">
            <h4>Zachary Casares</h4>
            {nameIsActive && <PiPencilFill className={Class.editBtn} />}
          </div>
          <div className={Class.divider}></div>
          <div className={Class.nameContainer} onMouseOver={enterHandler} onMouseOut={outHandler} id="username">
            <span>@user155493</span>
            {usernameIsActive && <PiPencilFill className={Class.editBtn} />}
          </div>
        </div>
        <BiDotsVerticalRounded className={Class.accountEdit} onClick={accountClickHandler} />
        {accountModalIsActive && <AccountModal closeModal={accountClickHandler} />}
        <ProfileSummary />
      </article>
    </section>
  );
}

export default UserProfile;
