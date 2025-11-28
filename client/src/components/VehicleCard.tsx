import { Car, Trash2, Star, Edit2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  color?: string;
  isDefault?: boolean;
  region?: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSetDefault?: (id: string) => void;
}

export default function VehicleCard({
  vehicle,
  onEdit,
  onDelete,
  onSetDefault,
}: VehicleCardProps) {
  return (
    <Card className={`hover-elevate transition-all ${vehicle.isDefault ? "border-primary" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
            <Car className="h-6 w-6 text-muted-foreground" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono font-bold text-lg" data-testid={`plate-${vehicle.id}`}>
                {vehicle.plate}
              </span>
              {vehicle.isDefault && (
                <Badge variant="secondary" className="gap-1">
                  <Star className="h-3 w-3" />
                  Основной
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{vehicle.model}</span>
              {vehicle.color && (
                <>
                  <span className="text-muted">•</span>
                  <span>{vehicle.color}</span>
                </>
              )}
              {vehicle.region && (
                <>
                  <span className="text-muted">•</span>
                  <span>{vehicle.region}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            {!vehicle.isDefault && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onSetDefault?.(vehicle.id)}
                title="Сделать основным"
                data-testid={`button-default-${vehicle.id}`}
              >
                <Star className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit?.(vehicle.id)}
              data-testid={`button-edit-${vehicle.id}`}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete?.(vehicle.id)}
              className="text-destructive hover:text-destructive"
              data-testid={`button-delete-${vehicle.id}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
