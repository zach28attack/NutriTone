import Class from "./DiarySummary.module.css";
import {useState, useEffect} from "react";
import Cookies from "js-cookie";

function DiarySummary(props) {
  const [calories, setCalories] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [budget, setBudget] = useState(1850);
  const [under, setUnder] = useState(0);

  useEffect(() => {
    setCalories(props.calories);
    setUnder(budget - (props.calories - caloriesBurned));
  }, [props.calories]);

  return (
    <div className={Class.container}>
      <div className={Class.arrowLeft} onClick={props.leftArrowClick}>
        <div></div>
      </div>
      <div></div>
      <div className={Class.summary}>
        <ul className={Class.summaryHeader}>
          <li className={Class.headerItem}>Budget</li>
          <li className={Class.headerItem}>Food</li>
          <li className={Class.headerItem}>Exercise</li>
          <li className={Class.headerItem}>Net</li>
          <li className={Class.headerItem}>Under</li>
        </ul>
        <ul className={Class.listValues}>
          <li className={Class.valueItem}>{budget}</li> {/* Budget */}
          <li className={Class.valueItem}>+</li>
          <li className={Class.valueItem}>{calories}</li> {/* total calories logged */}
          <li className={Class.valueItem}>+</li>
          <li className={Class.valueItem}>{caloriesBurned}</li> {/* calories burned */}
          <li className={Class.valueItem}>+</li>
          <li className={Class.valueItem}>{calories - caloriesBurned}</li> {/* total cals consumed - burned */}
          <li className={Class.valueItem}>+</li>
          <li className={Class.valueItem}>
            <div className={`${under >= 0 ? Class.calsUnder : Class.calsOver}`}>{under}</div> {/* total sum */}
          </li>
        </ul>
      </div>
      <div className={Class.arrowRight} onClick={props.rightArrowClick}>
        <div></div>
      </div>
    </div>
  );
}

export default DiarySummary;
