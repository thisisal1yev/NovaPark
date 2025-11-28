import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type ChartType = "line" | "bar" | "doughnut";

interface StatsChartProps {
  title: string;
  type: ChartType;
  data: ChartData<any>;
  options?: ChartOptions<any>;
  height?: number;
}

export default function StatsChart({
  title,
  type,
  data,
  options,
  height = 300,
}: StatsChartProps) {
  const chartRef = useRef<any>(null);

  const defaultOptions: ChartOptions<any> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 13 },
      },
    },
    scales: type !== "doughnut" ? {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { size: 11 },
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: { size: 11 },
        },
      },
    } : undefined,
    ...options,
  };

  const renderChart = () => {
    switch (type) {
      case "line":
        return <Line ref={chartRef} data={data} options={defaultOptions} />;
      case "bar":
        return <Bar ref={chartRef} data={data} options={defaultOptions} />;
      case "doughnut":
        return <Doughnut ref={chartRef} data={data} options={defaultOptions} />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold" data-testid={`chart-title-${title.toLowerCase().replace(/\s/g, '-')}`}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height }} data-testid={`chart-${title.toLowerCase().replace(/\s/g, '-')}`}>
          {renderChart()}
        </div>
      </CardContent>
    </Card>
  );
}
