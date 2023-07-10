import Class from "./AccountModal.module.css";

function AccountModal() {
  return (
    <div className={Class.bgModal}>
      <div className={Class.modal}>
        <header>
          <span>Account</span>
          <span>Settings</span>
        </header>

        <form>
          <div>
            <label>User</label>
            <input type="text" />
          </div>
          <div>
            <label>Username</label>
            <input type="text" placeholder="@" />
          </div>
          <div>
            <label>Email</label>
            <input type="text" />
          </div>
          <div>
            <label>Password</label>
            <input type="text" />
          </div>
          <div>
            <label>Confirm-Password</label>
            <input type="text" />
          </div>
          <div>
            <input type="submit" className={Class.submit} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountModal;
