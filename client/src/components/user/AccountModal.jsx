import Class from "./AccountModal.module.css";
import AccountForm from "./AccountForm";

function AccountModal({closeModal, setName, setUsername}) {
  const bgHandler = (e) => {
    if (e.target.classList.value === `${Class.bgModal}`) {
      closeModal();
    }
  };
  return (
    <div className={Class.bgModal} onClick={bgHandler}>
      <div className={Class.modal}>
        <header>
          <span>Account</span>
          <span>Settings</span>
        </header>
        <AccountForm setName={setName} setUsername={setUsername} />
        {/* <Settings/> */}
      </div>
    </div>
  );
}

export default AccountModal;
