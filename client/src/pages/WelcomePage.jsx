import Class from "./WelcomePage.module.css";
import UserSignup from "../components/user/Signup";
import UserLogin from "../components/user/Login";

function WelcomePage() {
  return (
    <div className={Class.jumbotron}>
      <UserSignup />
      <div className={Class.divider}></div>
      <UserLogin />
    </div>
  );
}

export default WelcomePage;
