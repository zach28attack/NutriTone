import Class from "./UserProfile.module.css";
import {useState, useEffect} from "react";
import {BiDotsVerticalRounded} from "react-icons/bi";
import AccountModal from "../user/AccountModal";
import ProfileSummary from "./ProfileSummary";
import UserPosts from "./UserPosts";
import Cookies from "js-cookie";
import {getProfilePic} from "../../apis/userApi";

function UserProfile() {
  const [accountModalIsActive, setAccountModalIsActive] = useState();
  const [name, setName] = useState(Cookies.get("name"));
  const [username, setUsername] = useState(Cookies.get("username"));
  const [image, setImage] = useState();

  const accountClickHandler = () => {
    setAccountModalIsActive(!accountModalIsActive);
  };
  const getUserProfileImg = async () => {
    const imgData = await getProfilePic();
    setImage(imgData);
  };
  useEffect(() => {
    getUserProfileImg();
  }, []);

  return (
    <>
      <section className={Class.container}>
        <article className={Class.profile}>
          <img src={image ? image : "blank.png"} alt="user profile pic" />
          <div className={Class.nameGroup}>
            <h4>{name}</h4>
            <div className={Class.divider}></div>
            <span>@{username}</span>
          </div>
          <BiDotsVerticalRounded className={Class.accountEdit} onClick={accountClickHandler} />
          {accountModalIsActive && (
            <AccountModal
              closeModal={accountClickHandler}
              setName={setName}
              setUsername={setUsername}
              setImage={setImage}
            />
          )}
          <ProfileSummary />
        </article>
      </section>
      <UserPosts />
    </>
  );
}

export default UserProfile;
