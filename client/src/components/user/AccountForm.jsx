import Class from "./AccountForm.module.css";
import {useState} from "react";
import Cookies from "js-cookie";
import {updateAccount, uploadImage} from "../../apis/userApi";

function AccountForm({setName, setUsername, setImage, closeModal}) {
  const [nameInput, setNameInput] = useState(Cookies.get("name"));
  const [usernameInput, setUsernameInput] = useState(Cookies.get("username"));
  const [emailInput, setEmailInput] = useState(Cookies.get("email"));
  const [passwordInput, setPasswordInput] = useState();
  const [passwordConfirmationInput, setPasswordConfirmationInput] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  const nameHandler = (input) => setNameInput(input.target.value);
  const usernameHandler = (input) => setUsernameInput(input.target.value);
  const emailHandler = (input) => setEmailInput(input.target.value);
  const passwordHandler = (input) => setPasswordInput(input.target.value);
  const passwordConfirmationHandler = (input) => setPasswordConfirmationInput(input.target.value);
  const fileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (passwordInput !== passwordConfirmationInput || passwordInput.toString().length <= 2) return false;
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = async () => {
        setImage(reader.result);
        uploadImage(reader.result);
      };
    }
    const success = await updateAccount(nameInput, usernameInput, emailInput, passwordInput, passwordConfirmationInput);
    if (success) {
      setName(nameInput);
      setUsername(usernameInput);
      closeModal();
    }
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
        <label>Email</label>
        <input type="email" placeholder="example@email.com" id="email" onChange={emailHandler} value={emailInput} />
      </div>

      <div className={Class.uploadGroup}>
        <label>Change Profile Pic</label>
        <input type="file" onChange={fileHandler} />
      </div>
      <div>
        <label>Password *</label>
        <input type="password" id="password" onChange={passwordHandler} />
      </div>
      <div>
        <label>Confirm-Password *</label>
        <input type="password" id="passwordConfirmation" onChange={passwordConfirmationHandler} />
      </div>
      <div>
        <input type="submit" className={Class.submit} />
      </div>
    </form>
  );
}

export default AccountForm;
