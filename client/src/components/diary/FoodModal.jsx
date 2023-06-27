import Class from "./FoodModal.module.css";

function FoodModal(props) {
  const clickHandler = () => {
    props.setIsActive(false);
  };
  const [searchTabActive, setSearchTabActive] = useState(true);
  return (
    <div className={Class.backgroundModal} onClick={clickHandler}>
      <div className={Class.container}>
        <div className={Class.card}></div>
      </div>
    </div>
  );
}

export default FoodModal;
