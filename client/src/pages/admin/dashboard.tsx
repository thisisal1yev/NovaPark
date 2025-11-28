import { useState } from "react";
import { Car, DollarSign, Users, TrendingUp, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import KPICard from "@/components/KPICard";
import StatsChart from "@/components/StatsChart";

// todo: remove mock data
const hourlyData = {
  labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"],
  datasets: [
    {
      label: "Занятость %",
      data: [25, 15, 65, 85, 92, 78],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      fill: true,
      tension: 0.4,
    },
  ],
};

const revenueData = {
  labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  datasets: [
    {
      label: "Доход (тыс. сум)",
      data: [1200, 1450, 1100, 1680, 1920, 2100, 1850],
      backgroundColor: "rgba(34, 197, 94, 0.8)",
      borderRadius: 6,
    },
  ],
};

const occupancyData = {
  labels: ["Свободно", "Занято", "Забронировано"],
  datasets: [
    {
      data: [120, 280, 50],
      backgroundColor: [
        "rgb(34, 197, 94)",
        "rgb(239, 68, 68)",
        "rgb(245, 158, 11)",
      ],
      borderWidth: 0,
    },
  ],
};

const forecastData = {
  labels: ["12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
  datasets: [
    {
      label: "Прогноз",
      data: [85, 90, 95, 88, 75, 45],
      borderColor: "rgb(168, 85, 247)",
      backgroundColor: "rgba(168, 85, 247, 0.1)",
      fill: true,
      tension: 0.4,
      borderDash: [5, 5],
    },
    {
      label: "Факт",
      data: [82, 88, null, null, null, null],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      fill: true,
      tension: 0.4,
    },
  ],
};

interface RecentActivity {
  id: string;
  type: "entry" | "exit" | "booking" | "alert";
  message: string;
  time: string;
  plate?: string;
}

const recentActivity: RecentActivity[] = [
  { id: "1", type: "entry", message: "Въезд на парковку", time: "2 мин назад", plate: "01 A 789 GH" },
  { id: "2", type: "booking", message: "Новое бронирование", time: "5 мин назад", plate: "01 B 456 DE" },
  { id: "3", type: "exit", message: "Выезд с парковки", time: "8 мин назад", plate: "01 C 123 AB" },
  { id: "4", type: "alert", message: "Неопознанный автомобиль", time: "12 мин назад", plate: "XX X 000 XX" },
  { id: "5", type: "entry", message: "Въезд на парковку", time: "15 мин назад", plate: "01 D 555 EE" },
];

export default function AdminDashboard() {
  const getActivityIcon = (type: RecentActivity["type"]) => {
    switch (type) {
      case "entry":
        return <div className="h-2 w-2 rounded-full bg-parking-available" />;
      case "exit":
        return <div className="h-2 w-2 rounded-full bg-parking-occupied" />;
      case "booking":
        return <div className="h-2 w-2 rounded-full bg-primary" />;
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-parking-reserved" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Обзор системы парковок</p>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Обновлено: {new Date().toLocaleTimeString("ru")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Активные сессии"
          value={156}
          subtitle="из 450 мест"
          icon={Car}
          trend={{ value: 12, isPositive: true }}
          gradient="from-blue-500 to-cyan-500"
        />
        <KPICard
          title="Доход сегодня"
          value="2.4M сум"
          icon={DollarSign}
          trend={{ value: 8, isPositive: true }}
          gradient="from-green-500 to-emerald-500"
        />
        <KPICard
          title="Пользователи"
          value={1247}
          subtitle="активных"
          icon={Users}
          trend={{ value: 15, isPositive: true }}
          gradient="from-purple-500 to-pink-500"
        />
        <KPICard
          title="Средняя загрузка"
          value="78%"
          subtitle="за сегодня"
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
          gradient="from-orange-500 to-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <StatsChart
            title="Почасовая загрузка (сегодня)"
            type="line"
            data={hourlyData}
            height={280}
          />
          <StatsChart
            title="Доход за неделю"
            type="bar"
            data={revenueData}
            height={280}
          />
        </div>

        <div className="space-y-6">
          <StatsChart
            title="Распределение мест"
            type="doughnut"
            data={occupancyData}
            height={220}
          />
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Последняя активность</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-3 text-sm"
                    data-testid={`activity-${activity.id}`}
                  >
                    <div className="flex items-center justify-center w-6">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate">{activity.message}</p>
                      {activity.plate && (
                        <p className="text-xs text-muted-foreground font-mono">
                          {activity.plate}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <StatsChart
        title="Прогноз загрузки (следующие 12 часов)"
        type="line"
        data={forecastData}
        height={250}
      />
    </div>
  );
}
