import Class from "./DiaryItem.module.css";
import OptionsBtn from "./OptionsBtn";
function DiaryItem(props) {
  return (
    <div className={Class.item}>
      <div className={Class.itemGroup}>
        <div className={Class.itemName}>{props.name}</div>
        <sub className={Class.itemServings}>servings:{props.servings}</sub>
      </div>
      <div className={Class.actionGroup}>
        <div className={Class.itemCalories}>{props.calories}</div>
        <OptionsBtn />
      </div>
    </div>
  );
}

export default DiaryItem;
