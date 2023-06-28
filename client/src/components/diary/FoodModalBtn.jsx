import Class from "./FoodModalBtn.module.css";
import {useState} from "react";
import {createPortal} from "react-dom";
import FoodModal from "./FoodModal";

function FoodModalBtn(props) {
  const [modalIsActive, setModalIsActive] = useState(false);
  const btnClickHandler = () => {
    props.setIsActive(false);
    setModalIsActive(true);
  };
  return (
    <div className={Class.container}>
      <div className={`${Class.button} ${props.isActive && Class.active}`} onClick={btnClickHandler}>
        Foods
      </div>
      {modalIsActive &&
        createPortal(
          <FoodModal setIsActive={setModalIsActive} addItem={props.addItem} timeOfDay={props.timeOfDay} />,
          document.querySelector("#modal")
        )}
    </div>
  );
}

export default FoodModalBtn;
