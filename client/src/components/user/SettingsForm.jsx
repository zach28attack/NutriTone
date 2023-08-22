import Class from "./SettingsForm.module.css";
import {useState} from "react";
import Cookies from "js-cookie";
import {updateAccountPassword, updateAccountEmail} from "../../apis/userApi";

function SettingsForm({closeModal}) {
  const [emailInput, setEmailInput] = useState(Cookies.get("email"));
  const [passwordInput, setPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [passwordConfirmationInput, setPasswordConfirmationInput] = useState("");

  const emailHandler = (input) => setEmailInput(input.target.value);
  const passwordHandler = (input) => setPasswordInput(input.target.value);
  const newPasswordHandler = (input) => setNewPasswordInput(input.target.value);
  const passwordConfirmationHandler = (input) => setPasswordConfirmationInput(input.target.value);

  const submitHandler = async (e) => {
    e.preventDefault();
    closeModal();
    // if email is different than saved email then update email
    if (emailInput !== Cookies.get("email")) updateAccountEmail(emailInput, passwordInput);

    // check if new passwords match and are longer than 2 characters then update
    if (passwordConfirmationInput === newPasswordInput || newPasswordInput.toString().length > 2)
      updateAccountPassword(newPasswordInput, passwordConfirmationInput, passwordInput);
  };
  return (
    <>
      <form className={Class.form} onSubmit={submitHandler}>
        <div>
          <label>Email</label>
          <input type="email" placeholder="example@email.com" id="email" onChange={emailHandler} value={emailInput} />
        </div>
        <div>
          <label>New Password </label>
          <input type="password" id="password" onChange={newPasswordHandler} />
          <label>Confirm-Password</label>
          <input type="password" id="passwordConfirmation" onChange={passwordConfirmationHandler} />
        </div>

        <div>
          <label>
            Password <span>*</span>
          </label>
          <input type="password" id="password" onChange={passwordHandler} />
        </div>

        <div>
          <input type="submit" className={Class.submit} />
        </div>
      </form>
    </>
  );
}

export default SettingsForm;
