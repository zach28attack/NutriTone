import Class from "./Login.module.css";
import {useState} from "react";
import {login} from "../../../api";
import {useNavigate} from "react-router-dom";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameHandler = (val) => {
    setUsername(val.target.value);
  };
  const passwordHandler = (val) => {
    setPassword(val.target.value);
  };
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className={Class.container}>
      <h1 className={Class.title}>Login</h1>
      <form className={Class.form} onSubmit={loginHandler}>
        <label className={Class.label}>Username</label>
        <input className={Class.input} onChange={usernameHandler}></input>

        <label className={Class.label}>Password</label>
        <input className={Class.input} onChange={passwordHandler}></input>

        <input type="submit" className={Class.login} />

        <div className={Class.formLinks}>
          <a className={Class.formLink}>Forgot Username</a>
          <div className={Class.divider}></div>
          <a className={Class.formLink}>Forgot Password</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
