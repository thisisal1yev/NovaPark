import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface ParkingSpot {
  id: string;
  row: string;
  number: number;
  isAvailable: boolean;
  isSelected?: boolean;
  type?: "regular" | "vip" | "charging";
}

export interface ParkingLevel {
  level: number;
  spots: ParkingSpot[];
}

interface ParkingSpotsProps {
  levels: ParkingLevel[];
  onSelectSpot?: (spotId: string) => void;
  selectedSpotId?: string;
}

export default function ParkingSpots({
  levels,
  onSelectSpot,
  selectedSpotId,
}: ParkingSpotsProps) {
  const [selectedLevel, setSelectedLevel] = useState(0);

  const currentLevel = levels[selectedLevel];
  const spotsPerRow = 8;

  const getSpotColor = (spot: ParkingSpot) => {
    if (spot.id === selectedSpotId) {
      return "bg-primary text-primary-foreground border-2 border-primary";
    }
    if (!spot.isAvailable) {
      return "bg-parking-occupied/50 text-muted-foreground cursor-not-allowed";
    }
    if (spot.type === "vip") {
      return "bg-amber-500/20 text-foreground border-2 border-amber-500 hover-elevate";
    }
    if (spot.type === "charging") {
      return "bg-parking-available/20 text-foreground border-2 border-parking-available hover-elevate";
    }
    return "bg-parking-available/10 text-foreground border-2 border-parking-available hover-elevate";
  };

  const getSpotLabel = (spot: ParkingSpot) => {
    if (spot.type === "vip") return "VIP";
    if (spot.type === "charging") return "⚡";
    return "";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Выбор места</span>
          <div className="flex gap-1">
            {levels.map((level, idx) => (
              <Badge
                key={level.level}
                variant={selectedLevel === idx ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedLevel(idx)}
                data-testid={`level-${level.level}`}
              >
                Этаж {level.level}
              </Badge>
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2 text-xs flex-wrap">
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 rounded bg-parking-available/50" />
            <span>Свободно</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 rounded bg-parking-occupied/50" />
            <span>Занято</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 rounded bg-primary/50" />
            <span>Выбрано</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 rounded border-2 border-amber-500" />
            <span>VIP</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 rounded border-2 border-parking-available" />
            <span>Зарядка</span>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-6">
          <div className="space-y-1.5">
            {Array.from({ length: Math.ceil(currentLevel.spots.length / spotsPerRow) }).map((_, rowIdx) => {
              const rowSpots = currentLevel.spots.slice(
                rowIdx * spotsPerRow,
                (rowIdx + 1) * spotsPerRow
              );
              return (
                <div key={rowIdx} className="flex gap-2 justify-center">
                  <span className="w-8 text-center text-xs font-medium text-muted-foreground pt-1">
                    {String.fromCharCode(65 + rowIdx)}
                  </span>
                  <div className="flex gap-2 flex-wrap justify-center">
                    {rowSpots.map((spot) => (
                      <button
                        key={spot.id}
                        onClick={() => {
                          if (spot.isAvailable) {
                            onSelectSpot?.(spot.id);
                          }
                        }}
                        disabled={!spot.isAvailable}
                        className={`relative h-10 w-10 rounded-md font-medium text-xs transition-all ${getSpotColor(spot)}`}
                        data-testid={`spot-${spot.id}`}
                        title={`${spot.row}${spot.number} - ${spot.type || "обычное"}`}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          {getSpotLabel(spot) || spot.number}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {selectedSpotId && (
          <div className="p-3 bg-primary/10 rounded-lg border border-primary">
            <p className="text-sm">
              <span className="font-medium">Выбранное место: </span>
              <span className="font-mono font-bold" data-testid="selected-spot-display">
                {currentLevel.spots.find((s) => s.id === selectedSpotId)?.row}
                {currentLevel.spots.find((s) => s.id === selectedSpotId)?.number}
              </span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Helper функция для создания макета парковки
export function createMockParkingLevels(levels: number = 3): ParkingLevel[] {
  return Array.from({ length: levels }).map((_, levelIdx) => ({
    level: levelIdx + 1,
    spots: Array.from({ length: 40 }).map((_, spotIdx) => {
      const row = String.fromCharCode(65 + Math.floor(spotIdx / 8));
      const number = (spotIdx % 8) + 1;
      const isVip = spotIdx % 5 === 0;
      const isCharging = spotIdx % 7 === 0;
      const isOccupied = spotIdx % 3 === 0;

      return {
        id: `level-${levelIdx + 1}-${row}-${number}`,
        row,
        number,
        isAvailable: !isOccupied,
        type: isVip ? "vip" : isCharging ? "charging" : "regular",
      };
    }),
  }));
}
