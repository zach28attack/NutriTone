import Class from "./Navbar.module.css";
import {BiLineChartDown} from "react-icons/bi";
import {FaUserFriends, FaUser} from "react-icons/fa";
import {GiWhistle} from "react-icons/gi";
import {logout} from "../../apis/userApi";
import {useNavigate, Link} from "react-router-dom";
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
        <Link to="/">
          <BsJournalBookmark className={Class.icon} />
        </Link>
        <Link to="/stats">
          <BiLineChartDown className={Class.icon} />
        </Link>
        <Link to="/community">
          <FaUserFriends className={Class.icon} />
        </Link>
        <Link to="/coach">
          <GiWhistle className={Class.icon} />
        </Link>
        <Link to="/account">
          <FaUser className={Class.icon} />
        </Link>

        <button onClick={logoutHandler} className={Class.btn}>
          logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
