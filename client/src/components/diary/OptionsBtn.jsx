import Class from "./OptionsBtn.module.css";
import {useState} from "react";

function OptionsBtn() {
  const [isActive, setIsActive] = useState(false);
  const clickHandler = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={Class.container} onClick={clickHandler}>
      <div className={`${Class.dot1} ${isActive ? Class.dot1Active : undefined}`}></div>
      <div className={`${Class.dot2} ${isActive ? Class.dot2Active : undefined}`}></div>
      <div className={`${Class.dot3} ${isActive ? Class.dot3Active : undefined}`}></div>
    </div>
  );
}

export default OptionsBtn;
