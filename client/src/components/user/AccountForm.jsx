import Class from "./AccountForm.module.css";
import {useState} from "react";

function AccountForm() {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(name, username, email, password, passwordConfirmation);
  };
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const nameHandler = (input) => setName(input.target.value);
  const usernameHandler = (input) => setUsername(input.target.value);
  const emailHandler = (input) => setEmail(input.target.value);
  const passwordHandler = (input) => setPassword(input.target.value);
  const passwordConfirmationHandler = (input) => setPasswordConfirmation(input.target.value);

  return (
    <form className={Class.form} onSubmit={submitHandler}>
      <div>
        <label>Name</label>
        <input type="text" id="name" onChange={nameHandler} />
      </div>
      <div>
        <label>Username</label>
        <input type="username" placeholder="@" id="username" onChange={usernameHandler} />
      </div>
      <div>
        <label>Email</label>
        <input type="email" placeholder="example@email.com" id="email" onChange={emailHandler} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" id="password" onChange={passwordHandler} />
      </div>
      <div>
        <label>Confirm-Password</label>
        <input type="password" id="passwordConfirmation" onChange={passwordConfirmationHandler} />
      </div>
      <div>
        <input type="submit" className={Class.submit} />
      </div>
    </form>
  );
}

export default AccountForm;
