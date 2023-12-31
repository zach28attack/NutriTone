import Class from "./Diary.module.css";
import DiaryItem from "./DiaryItem";
import AddIcon from "./AddIcon";

function Diary(props) {
  return (
    <div className={Class.container}>
      <header className={Class.header}>
        <div>
          {props.timeOfDay}: {props.totalCalories}
        </div>
        <AddIcon addItem={props.addItem} timeOfDay={props.timeOfDay} recentItems={props.recentItems} />
      </header>
      {props.isLoading ? (
        <main className={Class.items}>
          <div id={`form-${props.timeOfDay}`}></div>
          <div className={Class.loading}>Loading...</div>
        </main>
      ) : (
        <main className={Class.items}>
          <div id={`form-${props.timeOfDay}`}></div>
          {props.items.map((item) => (
            <DiaryItem
              key={item._id}
              _id={item._id}
              timeOfDay={props.timeOfDay}
              name={item.name}
              servings={item.servings}
              calories={item.calories}
              updateTotalCals={props.updateTotalCals}
              deleteItem={props.deleteItem}
            />
          ))}
        </main>
      )}
      <div className={Class.cardBottom}></div>
    </div>
  );
}

export default Diary;
