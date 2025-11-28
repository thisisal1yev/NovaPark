import { useState, useEffect } from "react";
import { Car, MapPin, Clock, CreditCard, Navigation } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface ParkingSession {
  id: string;
  parkingName: string;
  parkingAddress: string;
  spotNumber: string;
  vehiclePlate: string;
  startTime: Date;
  pricePerHour: number;
  discountPercent?: number;
}

interface SessionCardProps {
  session: ParkingSession;
  onEndSession?: (id: string) => void;
  onNavigate?: (id: string) => void;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export default function SessionCard({ session, onEndSession, onNavigate }: SessionCardProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const startTimestamp = session.startTime.getTime();
    
    const updateElapsed = () => {
      const now = Date.now();
      setElapsedSeconds(Math.floor((now - startTimestamp) / 1000));
    };

    updateElapsed();
    const interval = setInterval(updateElapsed, 1000);
    return () => clearInterval(interval);
  }, [session.startTime]);

  const hours = elapsedSeconds / 3600;
  const baseCost = hours * session.pricePerHour;
  const discount = session.discountPercent ? baseCost * (session.discountPercent / 100) : 0;
  const totalCost = Math.max(0, baseCost - discount);

  const getTimerColor = () => {
    if (hours < 1) return "text-parking-available";
    if (hours < 3) return "text-parking-reserved";
    return "text-parking-occupied";
  };

  return (
    <Card className="overflow-hidden border-l-4 border-l-primary">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="font-mono" data-testid={`badge-spot-${session.id}`}>
                {session.spotNumber}
              </Badge>
              <Badge variant="outline" data-testid={`badge-plate-${session.id}`}>
                <Car className="h-3 w-3 mr-1" />
                {session.vehiclePlate}
              </Badge>
            </div>
            
            <h3 className="font-semibold text-lg" data-testid={`text-parking-${session.id}`}>
              {session.parkingName}
            </h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{session.parkingAddress}</span>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
              <Clock className="h-3.5 w-3.5" />
              <span>Время</span>
            </div>
            <div className={`font-mono text-2xl font-bold ${getTimerColor()}`} data-testid={`timer-${session.id}`}>
              {formatDuration(elapsedSeconds)}
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Базовая стоимость:</span>
            <span>{Math.round(baseCost).toLocaleString()} сум</span>
          </div>
          {session.discountPercent && session.discountPercent > 0 && (
            <div className="flex items-center justify-between text-sm text-parking-available">
              <span>Скидка ({session.discountPercent}%):</span>
              <span>-{Math.round(discount).toLocaleString()} сум</span>
            </div>
          )}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
            <span className="font-medium flex items-center gap-1">
              <CreditCard className="h-4 w-4" />
              К оплате:
            </span>
            <span className="text-xl font-bold" data-testid={`text-cost-${session.id}`}>
              {Math.round(totalCost).toLocaleString()} сум
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onNavigate?.(session.id)}
          data-testid={`button-navigate-${session.id}`}
        >
          <Navigation className="h-4 w-4 mr-2" />
          Маршрут
        </Button>
        <Button
          variant="destructive"
          className="flex-1"
          onClick={() => onEndSession?.(session.id)}
          data-testid={`button-end-${session.id}`}
        >
          Завершить
        </Button>
      </CardFooter>
    </Card>
  );
}
