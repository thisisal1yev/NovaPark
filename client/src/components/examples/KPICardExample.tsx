import { Car, DollarSign, TrendingUp, Users } from "lucide-react";
import KPICard from "../KPICard";

export default function KPICardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
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
        value="2,450,000 сум"
        icon={DollarSign}
        trend={{ value: 8, isPositive: true }}
        gradient="from-green-500 to-emerald-500"
      />
    </div>
  );
}
