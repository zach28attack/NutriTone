import Class from "./DiaryItem.module.css";
import OptionsBtn from "./OptionsBtn";
import {useState} from "react";
import OptionsModal from "./OptionsModal";

function DiaryItem(props) {
  const [isActive, setIsActive] = useState(false);

  const setActiveHandler = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={Class.item}>
      <div className={Class.itemGroup}>
        <div className={Class.itemName}>{props.name}</div>
        <sub className={Class.itemServings}>servings:{props.servings}</sub>
      </div>
      <div className={Class.actionGroup}>
        <div className={Class.itemCalories}>{props.calories}</div>
        <OptionsBtn onOptionsClick={setActiveHandler} isActive={isActive} />
      </div>
      {isActive && <OptionsModal setIsActive={setActiveHandler} />}
    </div>
  );
}

export default DiaryItem;
