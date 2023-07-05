import Class from "./ProgressChart.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {Line} from "react-chartjs-2";
import {useState, useEffect} from "react";
import {getWeightLogs} from "../../apis/weightApi";
import ChartForm from "./ChartForm";

function ProgressChart() {
  const [dateMonth, setDateMonth] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);

  // const [dateYear, setDateYear] = useState([]);
  //    start from now to a data point from 1 year ago or the
  //    oldest weightLog date to now, whatever is smaller

  const [logs, setLogs] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(300);

  useEffect(() => {
    getLogsAndSetData();
  }, []);

  const getLogsAndSetData = async () => {
    const logs = await getWeightLogs();
    const sortedLogs = logs.sort((a, b) => new Date(a.date) - new Date(b.date));
    setLogs(sortedLogs);
    setMin(
      logs.reduce((prev, current) => {
        return prev.weight < current.weight ? prev : current;
      })
    );

    setMax(
      logs.reduce((prev, current) => {
        return prev.weight > current.weight ? prev : current;
      })
    );
  };

  const addWeightLogHandler = (log) => {
    setLogs((prevLogs) => {
      const newLogs = [...prevLogs, log];
      return newLogs.sort((a, b) => new Date(a.date) - new Date(b.date));
    });
  };

  //
  // Line chart Config
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  const data = {
    labels: dateMonth,
    datasets: [
      {
        label: "Weight",
        data: logs.map((log) => {
          // change x: date to the selected sortBy timeframe:
          // if(sortByMonth) else if (sortByYear) and so on...
          return {x: new Date(log.date).toLocaleString("default", {month: "short"}), y: log.weight};
        }),
        borderColor: "#bf7d60",
        backgroundColor: "#bf7d60",
      },
    ],
  };
  // options for the line chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weight-loss Progress",
      },
    },
    scales: {
      y: {
        ticks: {
          // this function returns the y-axis value with ' lbs' attach, expl: '10 lbs'
          callback: function (value) {
            return value + " lbs";
          },
        },
        suggestedMin: parseInt(min.weight) - 20,
        suggestedMax: parseInt(max.weight) + 20,
      },
    },
  };
  //
  //
  return (
    <div className={Class.chartContainer}>
      <div className={Class.chartCard}>
        <div className={Class.chart}>
          <Line options={options} datasetIdKey="id" data={data} />
        </div>
        <ChartForm addWeightLog={addWeightLogHandler} />
      </div>
    </div>
  );
}

export default ProgressChart;
