import Chart from "chart.js/auto";
import * as React from "react";

const FakePerformanceChart = () => {
  const chartRef = React.useRef(null);

  React.useEffect(() => {
    if (chartRef.current) {
      createFakeChart(chartRef.current);
    }
  }, []);

  const createFakeChart = (canvas: any) => {
    const fakeData = {
      labels: ["jan", "fev", "mar", "avr", "mai", "june", "july", "aug"],
      datasets: [
        {
          label: "Node Performance",
          data: [65, 59, 80, 81, 56, 55, 40, 90],
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          borderColor: "rgba(239, 68, 68, 1)",
          borderWidth: 1,
          pointBackgroundColor: "rgba(255, 255, 255, 1)",
          pointBorderColor: "rgba(239, 68, 68, 1)",
          pointBorderWidth: 2,
          pointRadius: 5,
        },
        // rgb(153 27 27);239 68 68
      ],
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            color: "rgba(255, 255, 255, 0.8)",
          },
        },
        x: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          ticks: {
            color: "rgba(255, 255, 255, 0.8)",
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "rgba(255, 255, 255, 0.8)",
          },
        },
      },
    };

    new Chart(canvas, {
      type: "line",
      data: fakeData,
      options: chartOptions,
    });
  };

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default FakePerformanceChart;
