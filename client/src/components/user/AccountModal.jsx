import Class from "./AccountModal.module.css";
import AccountForm from "./AccountForm";

function AccountModal(props) {
  const bgHandler = (e) => {
    if (e.target.classList.value === `${Class.bgModal}`) {
      props.closeModal();
    }
  };
  return (
    <div className={Class.bgModal} onClick={bgHandler}>
      <div className={Class.modal}>
        <header>
          <span>Account</span>
          <span>Settings</span>
        </header>
        <AccountForm />
      </div>
    </div>
  );
}

export default AccountModal;
