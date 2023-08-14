import Class from "./AccountModal.module.css";
import AccountForm from "./AccountForm";
import {useState} from "react";
import SettingsForm from "./SettingsForm";

function AccountModal({closeModal, setName, setUsername}) {
  const bgHandler = (e) => {
    if (e.target.classList.value === `${Class.bgModal}`) {
      closeModal();
    }
  };
  const [accountFormActive, setAccountFormActive] = useState(true);
  const FormClickHandler = () => {
    setAccountFormActive(!accountFormActive);
  };
  return (
    <div className={Class.bgModal} onClick={bgHandler}>
      <div className={Class.modal}>
        <header>
          <span className={accountFormActive && Class.active} onClick={FormClickHandler}>
            Account
          </span>
          <span className={!accountFormActive && Class.active} onClick={FormClickHandler}>
            Settings
          </span>
        </header>
        {accountFormActive ? <AccountForm setName={setName} setUsername={setUsername} /> : <SettingsForm />}
      </div>
    </div>
  );
}

export default AccountModal;
