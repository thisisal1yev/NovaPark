import DiscountBadge, { DiscountList, DiscountType } from "../DiscountBadge";

// todo: remove mock data
const discounts = [
  { type: "loyal_customer" as DiscountType, percent: 10, label: "Постоянный клиент", description: "10+ визитов" },
  { type: "off_peak" as DiscountType, percent: 15, label: "Off-Peak", description: "22:00-08:00" },
  { type: "birthday" as DiscountType, percent: 50, label: "День рождения", description: "В ваш особенный день" },
];

export default function DiscountBadgeExample() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {discounts.map((d) => (
          <DiscountBadge key={d.type} discount={d} />
        ))}
      </div>
      <DiscountList discounts={discounts} maxDisplay={2} />
    </div>
  );
}
