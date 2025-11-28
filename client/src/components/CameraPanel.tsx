import { useState, useEffect } from "react";
import { Camera, CheckCircle, XCircle, AlertTriangle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface DetectedVehicle {
  plate: string;
  confidence: number;
  timestamp: Date;
  status: "recognized" | "unknown" | "blocked";
  vehicleType?: string;
}

interface CameraPanelProps {
  cameraId: string;
  cameraName: string;
  isLive?: boolean;
  onManualEntry?: () => void;
  onBlockVehicle?: (plate: string) => void;
}

// todo: remove mock data
const mockDetection: DetectedVehicle = {
  plate: "01 A 789 GH",
  confidence: 94,
  timestamp: new Date(),
  status: "recognized",
  vehicleType: "Седан",
};

export default function CameraPanel({
  cameraId,
  cameraName,
  isLive = true,
  onManualEntry,
  onBlockVehicle,
}: CameraPanelProps) {
  const [currentDetection, setCurrentDetection] = useState<DetectedVehicle | null>(mockDetection);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setIsProcessing(true);
      setTimeout(() => {
        setCurrentDetection({
          ...mockDetection,
          timestamp: new Date(),
          confidence: 85 + Math.random() * 14,
        });
        setIsProcessing(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  const getStatusBadge = (status: DetectedVehicle["status"]) => {
    switch (status) {
      case "recognized":
        return (
          <Badge className="bg-parking-available text-white border-0">
            <CheckCircle className="h-3 w-3 mr-1" />
            Распознан
          </Badge>
        );
      case "unknown":
        return (
          <Badge className="bg-parking-reserved text-white border-0">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Неизвестен
          </Badge>
        );
      case "blocked":
        return (
          <Badge className="bg-parking-occupied text-white border-0">
            <XCircle className="h-3 w-3 mr-1" />
            Заблокирован
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Camera className="h-5 w-5" />
            {cameraName}
          </CardTitle>
          {isLive && (
            <Badge variant="outline" className="gap-1">
              <span className="h-2 w-2 rounded-full bg-parking-occupied animate-pulse" />
              LIVE
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="text-center text-white/50">
              <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Камера {cameraId}</p>
              <p className="text-xs">Имитация видеопотока</p>
            </div>
          </div>
          
          {isProcessing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <RefreshCw className="h-8 w-8 text-white animate-spin" />
            </div>
          )}

          {currentDetection && !isProcessing && (
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center justify-between text-white">
                <div>
                  <p className="font-mono text-lg font-bold" data-testid={`plate-${cameraId}`}>
                    {currentDetection.plate}
                  </p>
                  <p className="text-xs text-white/70">{currentDetection.vehicleType}</p>
                </div>
                {getStatusBadge(currentDetection.status)}
              </div>
            </div>
          )}
        </div>

        {currentDetection && (
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">Уверенность распознавания</span>
                <span className="font-medium">{Math.round(currentDetection.confidence)}%</span>
              </div>
              <Progress value={currentDetection.confidence} className="h-2" />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={onManualEntry}
                data-testid={`button-manual-${cameraId}`}
              >
                Ручной ввод
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => onBlockVehicle?.(currentDetection.plate)}
                data-testid={`button-block-${cameraId}`}
              >
                Заблокировать
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
