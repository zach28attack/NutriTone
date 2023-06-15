import Class from "./DiaryItem.module.css";

function DiaryItem(props) {
  return (
    <div className={Class.item}>
      <div className={Class.itemGroup}>
        <div className={Class.itemName}>{props.name}</div>
        <sub className={Class.itemServings}>servings:{props.servings}</sub>
      </div>
      <div className={Class.itemCalories}>{props.calories}</div>
    </div>
  );
}

export default DiaryItem;
