import Class from "./ModalSearchItem.module.css";
import {useState, useEffect} from "react";

function ModalSearchItem(props) {
  const [calories, setCalories] = useState(0);
  const [servings, setServings] = useState(1);
  const [name, setName] = useState();
  const [servingSize, setServingSize] = useState(1);
  useEffect(() => {
    if (props.isRecentContent === false) {
      const filteredCalories = props.item.foodNutrients.filter((macro) => macro.nutrientName === "Energy")[0];
      const filteredServings = props.item.foodMeasures.filter((measurement) => {
        return measurement.disseminationText !== "" && measurement.disseminationText !== "Quantity not specified";
      })[0];
      const name = props.item.additionalDescriptions || props.item.description;
      setName(name);

      setCalories(filteredCalories.value);
      if (filteredServings) {
        setServings(filteredServings.disseminationText);
      }
    } else {
      const {calories, servings, name} = props.item;
      console.log(name);
      setCalories(calories);
      setServings(servings);
      setName(name);
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const item = {
      name: name,
      calories: parseInt(calories),
      servings: parseInt(servingSize),
      timeOfDay: props.timeOfDay,
    };
    props.addItem(item);
    props.setIsActive(false);
  };
  const inputHandler = (e) => {
    setServingSize(parseInt(e.target.value));
  };

  return (
    <div className={Class.container}>
      <div className={Class.item}>
        <div className={Class.name}>{name}</div>
        <div className={Class.infoGroup}>
          <div className={Class.calories}>Calories: {calories}</div>
          <div className={Class.servings}>Serv. Size: {servings}</div>
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
