import Class from "./ProfileSummary.module.css";

function ProfileSummary() {
  return (
    <summary className={Class.container}>
      <span className={Class.startWeightTitle}>Starting W.</span>
      <span className={Class.startWeightData}>315lbs</span>
      <div className={Class.horizontalDivider1}></div>

      <span className={Class.currentWeightTitle}>Current W.</span>
      <span className={Class.currentWeightData}>300lbs</span>
      <div className={Class.horizontalDivider2}></div>

      <span className={Class.goalWeightTitle}>Goal W.</span>
      <span className={Class.goalWeightData}>185lbs</span>
      <div className={Class.verticalDivider}></div>
    </summary>
  );
}

export default ProfileSummary;
