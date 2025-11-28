import StatsChart from "../StatsChart";

// todo: remove mock data
const hourlyData = {
  labels: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"],
  datasets: [
    {
      label: "Занятость",
      data: [45, 78, 92, 85, 95, 88, 65],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      fill: true,
      tension: 0.4,
    },
  ],
};

export default function StatsChartExample() {
  return (
    <div className="max-w-lg">
      <StatsChart
        title="Почасовая загрузка"
        type="line"
        data={hourlyData}
        height={250}
      />
    </div>
  );
}
