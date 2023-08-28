import Class from "./DiarySummary.module.css";
import {useState, useEffect, useContext} from "react";
import {GlobalContext} from "../../context/GlobalContext";

function DiarySummary(props) {
  const [calories, setCalories] = useState(0);
  const [under, setUnder] = useState(0);
  const {date, budget} = useContext(GlobalContext);

  useEffect(() => {
    setCalories(props.calories);
    setUnder(budget - props.calories);
  }, [props.calories, budget]);

  return (
    <div className={Class.container}>
      <div className={Class.arrowLeft} onClick={props.leftArrowClick}>
        <div></div>
      </div>
      <div className={Class.summary}>
        <ul className={Class.summaryHeader}>
          <li className={Class.headerItem}>Budget</li>
          <li className={Class.headerItem}>Food</li>
          <li className={Class.headerItem}>Under</li>
        </ul>
        <ul className={Class.listValues}>
          <li className={Class.valueItem}>{budget}</li>
          <li className={Class.valueItem}>+</li>
          <li className={Class.valueItem}>{calories}</li>
          <li className={Class.valueItem}>+</li>

          <li className={Class.valueItem}>
            <div className={`${under >= 0 ? Class.calsUnder : Class.calsOver}`}>{under}</div>
          </li>
        </ul>
        <div className={Class.dateContainer}>
          <div className={Class.date}>{date}</div>
        </div>
      </div>
      <div className={Class.arrowRight} onClick={props.rightArrowClick}>
        <div></div>
      </div>
    </div>
  );
}

export default DiarySummary;
