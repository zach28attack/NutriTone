import Class from "./DiaryForm.module.css";
import {useState} from "react";
import {BsFillArrowRightCircleFill} from "react-icons/bs";
import {updateItem} from "../../apis/diaryApi";

function DiaryForm({addItem, setIsActive, timeOfDay, isEditing, item, _id, editItem}) {
  const formSubmitHandlerClick = () => {
    const item = {name: inputName, calories: inputCalories, servings: inputServings, timeOfDay: timeOfDay, _id: _id};
    if (isEditing) {
      updateItem(item);
      editItem(item.name, item.servings, item.calories);
    }
    if (!isEditing) {
      addItem(item);
      setIsActive(false);
    }
  };
  const formSubmitHandlerKeypress = (e) => {
    const item = {name: inputName, calories: inputCalories, servings: inputServings, timeOfDay: timeOfDay, _id: _id};
    if (isEditing && e.key === "Enter") {
      updateItem(item);
      editItem(item.name, item.servings, item.calories);
    }
    if (!isEditing && e.key === "Enter") {
      addItem(item);
      setIsActive(false);
    }
  };
  const inputNameHandler = (e) => {
    setInputName(e.target.value);
  };
  const inputCaloriesHandler = (e) => {
    setInputCalories(e.target.value);
  };
  const inputServingsHandler = (e) => {
    setInputServings(e.target.value);
  };

  const [inputName, setInputName] = useState(item ? item.name : "");
  const [inputCalories, setInputCalories] = useState(item ? item.calories : "");
  const [inputServings, setInputServings] = useState(item ? item.servings : "");
  return (
    <div className={Class.container}>
      <form onKeyDown={formSubmitHandlerKeypress} className={Class.form}>
        <div className={Class.formGroup1}>
          <label className={Class.label}>Add Name</label>
          <input type="text" onChange={inputNameHandler} className={Class.input} value={inputName} />
        </div>
        <div className={Class.formGroup2}>
          <label className={Class.label}>Calories</label>
          <input type="number" onChange={inputCaloriesHandler} className={Class.input} value={inputCalories} />
        </div>
        <div className={Class.formGroup3}>
          <label className={Class.label}>Servings</label>
          <input type="number" onChange={inputServingsHandler} className={Class.input} value={inputServings} />
        </div>
        <BsFillArrowRightCircleFill className={Class.submitBtn} onClick={formSubmitHandlerClick} />
      </form>
    </div>
  );
}

export default DiaryForm;
