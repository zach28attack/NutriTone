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

function ProgressChart() {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
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
          callback: function (value) {
            return value + " lbs";
          },
        },
      },
    },
  };

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "jun", "Jul"],
    datasets: [
      {
        label: "Weight",
        data: [19, 200, 25, 150, 80, 120, 100],
        borderColor: "#bf7d60",
        backgroundColor: "#bf7d60",
      },
    ],
  };
  return (
    <div className={Class.chartContainer}>
      <div className={Class.chartCard}>
        <div className={Class.chart}>
          <Line options={options} datasetIdKey="id" data={data} />
        </div>
      </div>
    </div>
  );
}

export default ProgressChart;
