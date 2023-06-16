import Class from "./OptionsModal.module.css";
import {createPortal} from "react-dom";

function BackgroundModal(props) {
  const closeModalHandler = () => {
    props.setIsActive();
  };
  return <div className={Class.backgroundModal} onClick={closeModalHandler}></div>;
}

function OptionsModal(props) {
  return (
    <>
      {createPortal(<BackgroundModal setIsActive={props.setIsActive} />, document.querySelector("#modal"))}
      <div className={Class.actionGroup}>
        <div className={Class.actionGroupBg}>
          <button>Edit</button>
          <button>Remove</button>
        </div>
      </div>
    </>
  );
}

export default OptionsModal;
