import Class from "./AddIcon.module.css";
import {useState} from "react";
import {createPortal} from "react-dom";
import DiaryForm from "./DiaryForm";

function AddIcon(props) {
  const addItemClickHandler = () => {
    setIsActive(!isActive);
  };
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className={`${Class.container} ${isActive && Class.active}`} onClick={addItemClickHandler}>
        <div className={Class.line1}></div>
        <div className={Class.line2}></div>
      </div>
      {isActive &&
        createPortal(
          <DiaryForm isActive={isActive} addItem={props.addItem} setIsActive={setIsActive} />,
          document.querySelector("#form-location")
        )}
    </>
  );
}
export default AddIcon;
