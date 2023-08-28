import Class from "./SignupCard.module.css";
import UserSignup from "./Signup";
import UserLogin from "./Login";

function SignupCard() {
  return (
    <div className={Class.jumbotron}>
      <UserSignup />
      <div className={Class.divider}></div>
      <UserLogin />
    </div>
  );
}

export default SignupCard;
