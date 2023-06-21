import Class from "./DiaryForm.module.css";
import {useState} from "react";
import {BsFillArrowRightCircleFill} from "react-icons/bs";

function DiaryForm({isActive}) {
  const formSubmitHandlerClick = () => {
    console.log(inputName, inputCalories, inputServings);
  };
  const formSubmitHandlerKeypress = (e) => {
    if (e.key === "Enter") {
      console.log(inputName, inputCalories, inputServings);
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
  const [inputName, setInputName] = useState();
  const [inputCalories, setInputCalories] = useState();
  const [inputServings, setInputServings] = useState();
  return (
    <div className={Class.container}>
      <form onKeyDown={formSubmitHandlerKeypress} className={Class.form}>
        <div className={Class.formGroup1}>
          <label className={Class.label}>Add Name</label>
          <input type="text" onChange={inputNameHandler} className={Class.input} />
        </div>
        <div className={Class.formGroup2}>
          <label className={Class.label}>Calories</label>
          <input type="number" onChange={inputCaloriesHandler} className={Class.input} />
        </div>
        <div className={Class.formGroup3}>
          <label className={Class.label}>Servings</label>
          <input type="number" onChange={inputServingsHandler} className={Class.input} />
        </div>
        <BsFillArrowRightCircleFill className={Class.submitBtn} onClick={formSubmitHandlerClick} />
      </form>
    </div>
  );
}

export default DiaryForm;
