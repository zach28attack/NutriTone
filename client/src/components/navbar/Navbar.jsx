import Class from "./Navbar.module.css";
import {BiLineChartDown} from "react-icons/bi";
import {FaUserFriends, FaUser} from "react-icons/fa";
import {GiWhistle} from "react-icons/gi";
import {logout} from "../../apis/userApi";
import {useNavigate} from "react-router-dom";
import {BsJournalBookmark} from "react-icons/bs";

function Navbar() {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    const success = await logout();
    if (success) {
      navigate("/welcome");
    }
  };

  return (
    <div className={Class.navBanner}>
      <div className={Class.border}>
        <a href="/">
          <BsJournalBookmark className={Class.icon} />
        </a>
        <a href="/stats">
          <BiLineChartDown className={Class.icon} />
        </a>
        <a href="/community">
          <FaUserFriends className={Class.icon} />
        </a>
        <a href="">
          <GiWhistle className={Class.icon} />
        </a>
        <a href="/account">
          <FaUser className={Class.icon} />
        </a>
        <button onClick={logoutHandler} className={Class.btn}>
          logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
