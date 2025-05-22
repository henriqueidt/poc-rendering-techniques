import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["TTFB", "CLS", "FCP", "LCP", "INP"];

export const data = {
  labels,
  datasets: [],
};

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    async function fetchMetrics() {
      const data = await fetch("/api/ui-metrics");
      const json = await data.json();
      if (json.status === "ok" && json.metrics) {
        console.log("metrics", json.metrics);
        const datasets = [];
        for (const key in json.metrics) {
          const metric = json.metrics[key];
          datasets.push({
            label: key,
            data: labels.map((label) => metric[label] || 0),
            backgroundColor: generateRandomColor(),
          });
          console.log("key", key);
          console.log("metric", metric);
        }
        setMetrics({
          labels,
          datasets,
        });
      }
    }
    fetchMetrics();
  }, []);

  return <div>{metrics && <Bar options={options} data={metrics} />}</div>;
}
