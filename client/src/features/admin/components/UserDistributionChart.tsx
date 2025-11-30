import React, { useEffect, useRef } from "react";
import {
  Chart,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
  type TooltipItem,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Card, CardContent, Typography } from "@mui/material";

// Register Chart.js components + plugin
Chart.register(PieController, ArcElement, Tooltip, Legend, ChartDataLabels);

interface UserDistributionChartProps {
  totalUsers: number; // regular users
  totalPremiumUsers: number;
}

const UserDistributionChart: React.FC<UserDistributionChartProps> = ({
  totalUsers,
  totalPremiumUsers,
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const regularUsers = totalUsers;
    const premiumUsers = totalPremiumUsers;

    const data = {
      labels: ["Regular Users", "Premium Users"],
      datasets: [
        {
          data: [regularUsers, premiumUsers],
          backgroundColor: ["#36A2EB", "#FF6384"],
        },
      ],
    };

    chartInstance.current = new Chart(chartRef.current, {
      type: "pie",
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          // ✔️ Legend shows "name + number"
          legend: {
            position: "top",
            labels: {
              generateLabels(chart) {
                const dataset = chart.data.datasets[0];

                // 🔥 強制告訴 TS：backgroundColor 是 string[]
                const bgColors = dataset.backgroundColor as string[];

                return chart.data.labels!.map((label, idx) => ({
                  text: `${label} — ${dataset.data[idx]}`,
                  fillStyle: bgColors[idx],
                  strokeStyle: bgColors[idx],
                  fontColor: "#ffffff",
                  index: idx,
                }));
              },
            },
          },

          // ✔️ Tooltip (still exists but optional)
          tooltip: {
            callbacks: {
              label: function (context: TooltipItem<"pie">) {
                const label = context.label || "";
                const value = context.raw as number;
                const total = (context.dataset.data as number[]).reduce(
                  (a, b) => a + b,
                  0
                );
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ${value} (${percentage}%)`;
              },
            },
          },

          // ✔️ Display data labels (percentage) ON the chart
          datalabels: {
            color: "#ffffff",
            font: { weight: "bold", size: 14 },
            formatter: (value, ctx) => {
              const dataArr = ctx.chart.data.datasets[0].data as number[];
              const total = dataArr.reduce((a, b) => a + b, 0);
              const percent = ((value / total) * 100).toFixed(1);
              return `${percent}%`;
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [totalUsers, totalPremiumUsers]);

  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          User Distribution
        </Typography>
        <div style={{ height: "300px", width: "100%" }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDistributionChart;
