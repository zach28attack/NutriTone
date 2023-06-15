import Class from "./OptionsBtn.module.css";

function OptionsBtn({onOptionsClick, isActive}) {
  const clickHandler = () => {
    onOptionsClick();
  };

  return (
    <div className={Class.container} onClick={clickHandler}>
      <div className={`${Class.dot1} ${isActive ? Class.dot1Active : undefined}`}></div>
      <div className={`${Class.dot2} ${isActive ? Class.dot2Active : undefined}`}></div>
      <div className={`${Class.dot3} ${isActive ? Class.dot3Active : undefined}`}></div>
    </div>
  );
}

export default OptionsBtn;
