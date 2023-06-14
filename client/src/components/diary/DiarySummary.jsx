import Class from "./DiarySummary.module.css";

function DiarySummary() {
  return (
    <div className={Class.container}>
      <div className={Class.arrowLeft}>
        <div></div>
      </div>
      <div className={Class.summary}>
        <ul className={Class.summaryHeader}>
          <li className={Class.headerItem}>Budget</li>
          <li className={Class.headerItem}>Food</li>
          <li className={Class.headerItem}>Exercise</li>
          <li className={Class.headerItem}>Net</li>
          <li className={Class.headerItem}>Under</li>
        </ul>
        <ul className={Class.listValues}>
          <li className={Class.valueItem}>1805</li>
          <li className={Class.valueItem}>+</li>
          <li className={Class.valueItem}>205</li>
          <li className={Class.valueItem}>+</li>
          <li className={Class.valueItem}>0</li>
          <li className={Class.valueItem}>+</li>
          <li className={Class.valueItem}>205</li>
          <li className={Class.valueItem}>+</li>
          <li className={Class.valueItem}>
            <div className={Class.calsUnder}>1600</div>
          </li>
          {/* <li className={Class.valueItem}><div className={Class.calsOver}>1600</div></li> */}
        </ul>
      </div>
      <div className={Class.arrowRight}>
        <div className={Class.arrowRight2}></div>
      </div>
    </div>
  );
}

export default DiarySummary;
