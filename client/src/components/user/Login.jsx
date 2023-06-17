import Class from "./Login.module.css";
function Login() {
  return (
    <form className={Class.form}>
      <label className={Class.label}>Username</label>
      <input className={Class.input}></input>

      <label className={Class.label}>Password</label>
      <input className={Class.input}></input>

      <button className={Class.login}>Submit</button>

      <div className={Class.formLinks}>
        <a className={Class.formLink}>Forgot Username</a>
        <div className={Class.divider}></div>
        <a className={Class.formLink}>Forgot Password</a>
      </div>
    </form>
  );
}

export default Login;
