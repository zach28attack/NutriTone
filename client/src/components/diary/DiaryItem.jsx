import Class from "./DiaryItem.module.css";
import OptionsBtn from "./OptionsBtn";
import {useState} from "react";
import OptionsModal from "./OptionsModal";
import DiaryForm from "./DiaryForm";

function DiaryItem(props) {
  // isActive controls options btn classes
  const [isActive, setIsActive] = useState(false);
  const setActiveHandler = () => {
    setIsActive(!isActive);
  };

  // if isEditing is true display item form
  const [isEditing, setIsEditing] = useState(false);

  const editClickHandler = () => {
    setIsEditing(true);
    setIsActive(false);
  };

  const deleteClickHandler = () => {
    props.deleteItem(props._id, calories * servings, props.timeOfDay);
  };

  const [name, setName] = useState(props.name);
  const [calories, setCalories] = useState(props.calories);
  const [servings, setServings] = useState(props.servings);

  // when form is submitted it will call this function
  const update = (name, serv, cals) => {
    setName(name);
    setCalories(cals);
    setServings(serv);
    setIsEditing(false);
    // send old calories total and new calories total
    props.updateTotalCals(calories * servings, cals * serv);
  };

  return (
    <>
      {!isEditing ? (
        <div className={Class.item}>
          <div className={Class.itemGroup}>
            <div className={Class.itemName}>{name}</div>
            <sub className={Class.itemServings}>servings:{servings}</sub>
          </div>
          <div className={Class.actionGroup}>
            <div className={Class.itemCalories}>{calories}</div>
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
      ) : (
        <DiaryForm
          isEditing={isEditing}
          item={{name: props.name, calories: props.calories, servings: props.servings}}
          timeOfDay={props.timeOfDay}
          _id={props._id}
          editItem={update}
        />
      )}
    </>
  );
}

export default DiaryItem;
