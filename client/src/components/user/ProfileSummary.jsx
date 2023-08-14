import Class from "./ProfileSummary.module.css";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../context/GlobalContext";

function ProfileSummary() {
  const {logs, firstLog, lastLog} = useContext(GlobalContext);
  // const [startWeight, setStartWeight] = useState(0);
  // const [currentWeight, setCurrentWeight] = useState(0);

  // useEffect(() => {
  //   setStartWeight(firstLog);
  //   setCurrentWeight(lastLog);
  // }, [logs]);

  return (
    <summary className={Class.container}>
      <span className={Class.startWeightTitle}>Starting W.</span>
      <span className={Class.startWeightData}>{firstLog}lbs</span>
      <div className={Class.horizontalDivider1}></div>

      <span className={Class.currentWeightTitle}>Current W.</span>
      <span className={Class.currentWeightData}>{lastLog}lbs</span>
      <div className={Class.horizontalDivider2}></div>

      <span className={Class.goalWeightTitle}>Progress</span>
      <span className={Class.goalWeightData}>
        {firstLog > lastLog ? `- ${firstLog - lastLog}` : `+ ${lastLog - firstLog}`} lbs
      </span>
      <div className={Class.verticalDivider}></div>
    </summary>
  );
}

export default ProfileSummary;
