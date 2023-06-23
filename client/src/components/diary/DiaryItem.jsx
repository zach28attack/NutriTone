import Class from "./DiaryItem.module.css";
import OptionsBtn from "./OptionsBtn";
import {useState} from "react";
import OptionsModal from "./OptionsModal";
import {updateItem} from "../../apis/diaryApi";

function DiaryItem(props) {
  const [isActive, setIsActive] = useState(false);

  const setActiveHandler = () => {
    setIsActive(!isActive);
  };

  const editClickHandler = () => {
    // TODO: change update data to edit form data
    const item = {
      name: "WAPDY",
      calories: 400,
      _id: "6494eea4aa374f233612df90",
      servings: 40,
      date: "1/1/2023",
      timeOfDay: "Breakfast",
    };
    updateItem(item);
  };

  const deleteClickHandler = () => {};

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
      {isActive && (
        <OptionsModal
          setIsActive={setActiveHandler}
          onEditClick={editClickHandler}
          onDeleteClick={deleteClickHandler}
        />
      )}
    </div>
  );
}

export default DiaryItem;
