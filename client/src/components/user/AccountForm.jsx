import Class from "./AccountForm.module.css";
import {useState} from "react";
import Cookies from "js-cookie";
import {updateAccount} from "../../apis/userApi";

function AccountForm({setName, setUsername, setImage, closeModal}) {
  const [nameInput, setNameInput] = useState(Cookies.get("name"));
  const [usernameInput, setUsernameInput] = useState(Cookies.get("username"));

  const nameHandler = (input) => setNameInput(input.target.value);
  const usernameHandler = (input) => setUsernameInput(input.target.value);
  const submitHandler = async (e) => {
    e.preventDefault();
    setName(nameInput);
    setUsername(usernameInput);
    closeModal();
    updateAccount(nameInput, usernameInput);
  };
  return (
    <form className={Class.form} onSubmit={submitHandler}>
      <div>
        <label>Name</label>
        <input type="text" id="name" onChange={nameHandler} value={nameInput} />
      </div>
      <div>
        <label>Username</label>
        <input type="text" placeholder="@username" id="username" onChange={usernameHandler} value={usernameInput} />
      </div>

      <div>
        <input type="submit" className={Class.submit} />
      </div>
    </form>
  );
}

export default AccountForm;
