import Class from "./AccountModal.module.css";
import AccountForm from "./AccountForm";
import {useState} from "react";
import SettingsForm from "./SettingsForm";
import {uploadImage, deleteAccount} from "../../apis/userApi";
import {useNavigate} from "react-router-dom";

function AccountModal({closeModal, setName, setUsername, setImage}) {
  const bgHandler = (e) => {
    if (e.target.classList.value === `${Class.bgModal}`) {
      closeModal();
    }
  };
  const [accountFormActive, setAccountFormActive] = useState(false);
  const [settingsFormActive, setSettingsFormActive] = useState(false);

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
  const navigate = useNavigate();
  const deleteAccountHandler = async () => {
    const success = await deleteAccount();
    if (!success) return;
    navigate("/welcome");
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
            <section className={Class.deleteGroup}>
              <h3>Delete Account</h3>
              <button onClick={deleteAccountHandler}>DELETE</button>
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
