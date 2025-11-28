import { MapPin, Car, Clock, Zap } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export interface ParkingLot {
  id: string;
  name: string;
  address: string;
  totalSpots: number;
  availableSpots: number;
  pricePerHour: number;
  hasCharging?: boolean;
  distance?: string;
  imageUrl?: string;
}

interface ParkingCardProps {
  parking: ParkingLot;
  onBook?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export default function ParkingCard({ parking, onBook, onViewDetails }: ParkingCardProps) {
  const occupancyPercent = ((parking.totalSpots - parking.availableSpots) / parking.totalSpots) * 100;
  
  const getAvailabilityStatus = () => {
    const ratio = parking.availableSpots / parking.totalSpots;
    if (ratio > 0.5) return { label: "Свободно", color: "bg-parking-available" };
    if (ratio > 0.2) return { label: "Умеренно", color: "bg-parking-reserved" };
    return { label: "Мало мест", color: "bg-parking-occupied" };
  };

  const status = getAvailabilityStatus();

  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-300">
      {parking.imageUrl && (
        <div className="relative h-32 overflow-hidden">
          <img
            src={parking.imageUrl}
            alt={parking.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge className={`${status.color} text-white border-0`} data-testid={`badge-status-${parking.id}`}>
              {status.label}
            </Badge>
          </div>
        </div>
      )}
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="font-semibold text-lg leading-tight" data-testid={`text-parking-name-${parking.id}`}>
              {parking.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{parking.address}</span>
            </div>
          </div>
          {parking.hasCharging && (
            <div className="flex items-center gap-1 text-parking-available">
              <Zap className="h-4 w-4" />
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5">
              <Car className="h-4 w-4 text-muted-foreground" />
              <span>
                <span className="font-medium text-foreground" data-testid={`text-available-${parking.id}`}>
                  {parking.availableSpots}
                </span>
                <span className="text-muted-foreground"> / {parking.totalSpots}</span>
              </span>
            </div>
            {parking.distance && (
              <span className="text-muted-foreground">{parking.distance}</span>
            )}
          </div>

          <Progress value={occupancyPercent} className="h-2" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-lg font-bold" data-testid={`text-price-${parking.id}`}>
                {parking.pricePerHour.toLocaleString()} сум
              </span>
              <span className="text-sm text-muted-foreground">/час</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onViewDetails?.(parking.id)}
          data-testid={`button-details-${parking.id}`}
        >
          Подробнее
        </Button>
        <Button
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
          onClick={() => onBook?.(parking.id)}
          disabled={parking.availableSpots === 0}
          data-testid={`button-book-${parking.id}`}
        >
          Забронировать
        </Button>
      </CardFooter>
    </Card>
  );
}
