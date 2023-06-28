import Class from "./ModalSearchItem.module.css";
import {useState} from "react";

function ModalSearchItem(props) {
  const calories = props.item.foodNutrients.filter((macro) => macro.nutrientName === "Energy")[0];
  const servings = props.item.foodMeasures.filter((measurement) => {
    return measurement.disseminationText !== "" && measurement.disseminationText !== "Quantity not specified";
  })[0];

  const submitHandler = (e) => {
    e.preventDefault();
    const name = props.item.additionalDescriptions || props.item.description;

    const item = {
      name: name,
      calories: parseInt(calories.value),
      servings: parseInt(servingSize),
      timeOfDay: props.timeOfDay,
    };
    props.addItem(item);
    props.setIsActive(false);
  };
  const [servingSize, setServingSize] = useState(1);
  const inputHandler = (e) => {
    setServingSize(parseInt(e.target.value));
  };
  return (
    <div className={Class.container}>
      <div className={Class.item}>
        <div className={Class.name}>{props.item.additionalDescriptions || props.item.description}</div>
        <div className={Class.infoGroup}>
          <div className={Class.calories}>Calories: {calories && calories.value}</div>
          <div className={Class.servings}>Serv. Size: {servings ? servings.disseminationText : "1"}</div>
        </div>
      </div>
      <form className={Class.actionGroup} onSubmit={submitHandler}>
        <input type="submit" className={Class.submit} value="Add" />
        <input type="number" className={Class.input} placeholder="serv." onChange={inputHandler} />
      </form>
    </div>
  );
}

export default ModalSearchItem;
