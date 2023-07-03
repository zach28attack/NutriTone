import Class from "./StatsPage.module.css";
import ProgressChart from "../components/stats/ProgressChart";

function StatsPage() {
  return (
    <div className={Class.page}>
      <ProgressChart />
    </div>
  );
}

export default StatsPage;
