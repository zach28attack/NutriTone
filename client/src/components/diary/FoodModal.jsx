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
  return (
    <div className={Class.backgroundModal} onClick={clickHandler}>
      <div className={Class.container}>
        <div className={Class.card}>
          <div className={Class.tabs}>
            <div className={`${Class.tab} ${!searchTabActive && Class.activeTab}`}>Recent</div>
            <div className={`${Class.tab} ${searchTabActive && Class.activeTab}`}>Search</div>
          </div>

          {searchTabActive ? <ModalSearchContent /> : <ModalRecentContent />}
        </div>
      </div>
    </div>
  );
}

export default FoodModal;
