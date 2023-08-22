import Class from "./AccountModal.module.css";
import AccountForm from "./AccountForm";
import {useState} from "react";
import SettingsForm from "./SettingsForm";
import {uploadImage} from "../../apis/userApi";

function AccountModal({closeModal, setName, setUsername, setImage}) {
  const bgHandler = (e) => {
    if (e.target.classList.value === `${Class.bgModal}`) {
      closeModal();
    }
  };
  const [accountFormActive, setAccountFormActive] = useState(false);
  const [settingsFormActive, setSettingsFormActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const accountClickHandler = () => {
    setAccountFormActive(true);
  };
  const settingsClickHandler = () => {
    setSettingsFormActive(true);
  };
  const resetClickHandler = () => {
    setAccountFormActive(false);
    setSettingsFormActive(false);
  };
  const fileHandler = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = async () => {
        setImage(reader.result);
        uploadImage(reader.result);
      };
    }
  };

  return (
    <div className={Class.bgModal} onClick={bgHandler}>
      <div className={Class.modal}>
        <header>
          {accountFormActive || settingsFormActive ? <button onClick={resetClickHandler}>{"<"}</button> : ""}
          <h1>Settings</h1>
        </header>
        {!accountFormActive && !settingsFormActive && (
          //
          <div className={Class.modalContent}>
            <section>
              <h3>Update Account</h3>
              <button onClick={accountClickHandler}>Name/Username</button>
              <button onClick={settingsClickHandler}>Email or Password</button>
            </section>
            <section>
              <form className={Class.uploadGroup}>
                <h3>Change Profile Pic</h3>
                <input type="file" onChange={fileHandler} />
              </form>
            </section>
            <section>
              <h3>Update Payment method</h3>
              <button onClick={accountClickHandler}>Name/Username</button>
            </section>
            <section>
              <h3>Manage Subscription</h3>
              <button onClick={settingsClickHandler}>Email or Password</button>
            </section>
            <section className={Class.deleteGroup}>
              <h3>Delete Account</h3>
              <button>DELETE</button>
            </section>
          </div>
          //
        )}
        {accountFormActive && (
          <AccountForm setName={setName} setUsername={setUsername} setImage={setImage} closeModal={closeModal} />
        )}
        {settingsFormActive && <SettingsForm closeModal={closeModal} />}
      </div>
    </div>
  );
}

export default AccountModal;

// make account modal more modern
// open to list of settings

//  - manage payment
