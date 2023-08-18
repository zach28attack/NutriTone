import Class from "./FoodModal.module.css";
import ModalRecentContent from "./ModalRecentContent";
import ModalSearchContent from "./ModalSearchContent";
import {useState} from "react";

function FoodModal(props) {
  const clickHandler = (e) => {
    if (e.target.className === Class.container) {
      props.setIsActive(false);
    }
  };
  const [searchTabActive, setSearchTabActive] = useState(true);
  const tabClickHandler = () => {
    setSearchTabActive(!searchTabActive);
  };
  const addItemHandler = (item) => {
    props.addItem(item);
  };

  return (
    <div className={Class.backgroundModal} onClick={clickHandler}>
      <div className={Class.container}>
        <div className={Class.card}>
          <div className={Class.tabs}>
            <div className={`${Class.tab} ${!searchTabActive && Class.activeTab}`} onClick={tabClickHandler}>
              Recent
            </div>
            <div className={`${Class.tab} ${searchTabActive && Class.activeTab}`} onClick={tabClickHandler}>
              Search
            </div>
          </div>

          {searchTabActive ? (
            <ModalSearchContent addItem={addItemHandler} timeOfDay={props.timeOfDay} setIsActive={props.setIsActive} />
          ) : (
            <ModalRecentContent
              addItem={props.addItem}
              timeOfDay={props.timeOfDay}
              setIsActive={props.setIsActive}
              recentItems={props.recentItems}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodModal;
