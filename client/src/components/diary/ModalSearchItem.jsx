import Class from "./ModalSearchItem.module.css";

function ModalSearchItem(props) {
  const calories = props.item.foodNutrients.filter((macro) => macro.nutrientName === "Energy")[0];
  const servings = props.item.foodMeasures.filter((measurement) => {
    return measurement.disseminationText !== "" && measurement.disseminationText !== "Quantity not specified";
  })[0];
  return (
    <div className={Class.container}>
      <div className={Class.item}>
        <div className={Class.name}>{props.item.additionalDescriptions || props.item.description}</div>
        <div className={Class.infoGroup}>
          <div className={Class.calories}>Calories: {calories && calories.value}</div>
          <div className={Class.servings}>Serv. Size: {servings ? servings.disseminationText : "1"}</div>
        </div>
      </div>
      <form className={Class.actionGroup}>
        <input type="submit" className={Class.submit} value="Add" />
        <input type="number" className={Class.input} placeholder="serv." />
      </form>
    </div>
  );
}

export default ModalSearchItem;
