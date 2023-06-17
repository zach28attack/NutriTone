import Class from "./Signup.module.css";

function Signup() {
  return (
    <form className={Class.form}>
      <label className={Class.label}>Email</label>
      <input className={Class.input} />

      <label className={Class.label}>Username</label>
      <input className={Class.input} />

      <label className={Class.label}>Password</label>
      <input className={Class.input} />

      <label className={Class.label}>Confirm Password</label>
      <input className={Class.input} />

      <button className={Class.submit}>Submit</button>
    </form>
  );
}

export default Signup;
