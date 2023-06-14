import Class from "./Navbar.module.css";
import {BiLineChartDown} from "react-icons/bi";
import {FaUserFriends, FaUser} from "react-icons/fa";
import {GiWhistle} from "react-icons/gi";

function Navbar() {
  return (
    <div className={Class.navBanner}>
      <div className={Class.border}>
        <BiLineChartDown className={Class.icon} />
        <FaUserFriends className={Class.icon} />
        <GiWhistle className={Class.icon} />
        <FaUser className={Class.icon} />
      </div>
    </div>
  );
}

export default Navbar;
