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
import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const regularUsers = totalUsers;
    const premiumUsers = totalPremiumUsers;

    const data = {
      labels: [t("admin.regularUsers"), t("admin.premiumUsers")],
      datasets: [
        {
          data: [regularUsers, premiumUsers],
          backgroundColor: ["#36A2EB", "#FF6384"],
        },
      ],
    };

    // Determine legend position based on screen width
    const isMobile = window.innerWidth < 900;

    // Get the text color based on theme mode
    const legendTextColor =
      theme.palette.mode === "dark" ? "#ffffff" : "#333333";

    chartInstance.current = new Chart(chartRef.current, {
      type: "pie",
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          // ✔️ Legend shows "name + number"
          legend: {
            position: isMobile ? "bottom" : "bottom",
            labels: {
              padding: 20,
              boxWidth: 20,
              boxHeight: 20,
              generateLabels(chart) {
                const dataset = chart.data.datasets[0];

                // 🔥 強制告訴 TS：backgroundColor 是 string[]
                const bgColors = dataset.backgroundColor as string[];

                return chart.data.labels!.map((label, idx) => ({
                  text: `${label} — ${dataset.data[idx]}`,
                  fillStyle: bgColors[idx],
                  strokeStyle: bgColors[idx],
                  fontColor: legendTextColor,
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

    // Handle window resize to update legend position
    const handleResize = () => {
      if (chartInstance.current) {
        const shouldBeMobile = window.innerWidth < 900;
        const currentPosition =
          chartInstance.current.options.plugins?.legend?.position;
        const newPosition = shouldBeMobile ? "bottom" : "bottom";

        if (currentPosition !== newPosition) {
          chartInstance.current.options.plugins!.legend!.position = newPosition;
          chartInstance.current.update();
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [totalUsers, totalPremiumUsers, t, theme.palette.mode]);

  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {t("admin.userDistribution")}
        </Typography>
        <div style={{ height: "300px", width: "100%" }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDistributionChart;
