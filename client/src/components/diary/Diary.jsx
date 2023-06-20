import Class from "./Diary.module.css";
import DiaryItem from "./DiaryItem";
import AddIcon from "./AddIcon";
function Diary(props) {
  let totalCalories = 0;
  for (let i = 0; i < props.diaries.length; i++) {
    totalCalories += props.diaries[i].calories;
  }
  return (
    <div className={Class.container}>
      <header className={Class.header}>
        <div>
          {props.timeOfDay}
          {": "}
          {totalCalories}
        </div>
        <AddIcon />
      </header>
      <main className={Class.items}>
        {props.diaries.map((item) => (
          <DiaryItem
            key={`${Math.random()}`}
            timeOfDay={props.timeOfDay}
            name={item.name}
            servings={item.servings}
            calories={item.calories}
          />
        ))}
      </main>
      <div className={Class.addBtn}></div>
    </div>
  );
}

export default Diary;
