import Class from "./Navbar.module.css";
import {BiLineChartDown} from "react-icons/bi";
import {FaUserFriends, FaUser} from "react-icons/fa";
import {GiWhistle} from "react-icons/gi";
import {logout} from "../../api";
import {useNavigate} from "react-router-dom";

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
        <BiLineChartDown className={Class.icon} />
        <FaUserFriends className={Class.icon} />
        <GiWhistle className={Class.icon} />
        <FaUser className={Class.icon} />
        <button onClick={logoutHandler}>logout</button>
      </div>
    </div>
  );
}

export default Navbar;
