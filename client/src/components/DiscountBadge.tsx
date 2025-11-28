import { Percent, Gift, Star, MapPin, Clock, Calendar, Cake, Users, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type DiscountType =
  | "loyal_customer"
  | "first_visit"
  | "other_region"
  | "high_availability"
  | "off_peak"
  | "weekend"
  | "birthday"
  | "referral"
  | "visit_bonus";

interface Discount {
  type: DiscountType;
  percent: number;
  label: string;
  description: string;
}

const discountConfig: Record<DiscountType, { icon: typeof Percent; color: string }> = {
  loyal_customer: { icon: Star, color: "bg-amber-500" },
  first_visit: { icon: Gift, color: "bg-green-500" },
  other_region: { icon: MapPin, color: "bg-blue-500" },
  high_availability: { icon: Percent, color: "bg-teal-500" },
  off_peak: { icon: Clock, color: "bg-purple-500" },
  weekend: { icon: Calendar, color: "bg-indigo-500" },
  birthday: { icon: Cake, color: "bg-pink-500" },
  referral: { icon: Users, color: "bg-orange-500" },
  visit_bonus: { icon: Award, color: "bg-cyan-500" },
};

interface DiscountBadgeProps {
  discount: Discount;
  showTooltip?: boolean;
}

export default function DiscountBadge({ discount, showTooltip = true }: DiscountBadgeProps) {
  const config = discountConfig[discount.type];
  const Icon = config.icon;

  const badge = (
    <Badge
      className={`${config.color} text-white border-0 gap-1`}
      data-testid={`discount-badge-${discount.type}`}
    >
      <Icon className="h-3 w-3" />
      <span>-{discount.percent}%</span>
    </Badge>
  );

  if (!showTooltip) return badge;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{badge}</TooltipTrigger>
      <TooltipContent>
        <p className="font-medium">{discount.label}</p>
        <p className="text-xs text-muted-foreground">{discount.description}</p>
      </TooltipContent>
    </Tooltip>
  );
}

interface DiscountListProps {
  discounts: Discount[];
  maxDisplay?: number;
}

export function DiscountList({ discounts, maxDisplay = 3 }: DiscountListProps) {
  const displayDiscounts = discounts.slice(0, maxDisplay);
  const remaining = discounts.length - maxDisplay;

  return (
    <div className="flex flex-wrap gap-1.5" data-testid="discount-list">
      {displayDiscounts.map((discount) => (
        <DiscountBadge key={discount.type} discount={discount} />
      ))}
      {remaining > 0 && (
        <Badge variant="secondary">+{remaining}</Badge>
      )}
    </div>
  );
}
