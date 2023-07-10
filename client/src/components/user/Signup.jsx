import Class from "./Signup.module.css";
import {useState} from "react";
import {signup} from "../../apis/userApi";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const emailInputHandler = (val) => {
    setEmail(val.target.value);
  };
  const usernameInputHandler = (val) => {
    setUsername(val.target.value);
  };
  const passwordInputHandler = (val) => {
    setPassword(val.target.value);
  };
  const passwordConfirmationInputHandler = (val) => {
    setPasswordConfirmation(val.target.value);
  };
  const navigate = useNavigate();
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("input:", email, username, password, passwordConfirmation);
    if (email && username && password && passwordConfirmation) {
      console.log("signup api call");
      const success = await signup(email, username, password, passwordConfirmation);
      if (success) {
        navigate("/");
      }
    }
  };

  return (
    <div className={Class.container}>
      <h1 className={Class.title}>Sign up</h1>
      <form className={Class.form} onSubmit={formSubmitHandler}>
        <label className={Class.label}>Email</label>
        <input className={Class.input} type="email" name="email" onChange={emailInputHandler} />

        <label className={Class.label}>Username</label>
        <input className={Class.input} type="username" name="username" onChange={usernameInputHandler} />

        <label className={Class.label}>Password</label>
        <input className={Class.input} type="password" name="password" onChange={passwordInputHandler} />

        <label className={Class.label}>Confirm Password</label>
        <input
          className={Class.input}
          type="password"
          name="passwordConfirmation"
          onChange={passwordConfirmationInputHandler}
        />

        <input type="submit" className={Class.submit} />
      </form>
    </div>
  );
}

export default Signup;
