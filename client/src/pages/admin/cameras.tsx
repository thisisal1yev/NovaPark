import { useState } from "react";
import { Camera, Grid, List, RefreshCw, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CameraPanel from "@/components/CameraPanel";

// todo: remove mock data
const cameras = [
  { id: "cam-01", name: "Въезд A", location: "Северный вход", isLive: true },
  { id: "cam-02", name: "Въезд B", location: "Южный вход", isLive: true },
  { id: "cam-03", name: "Выезд A", location: "Северный выход", isLive: true },
  { id: "cam-04", name: "Выезд B", location: "Южный выход", isLive: false },
];

interface DetectionLog {
  id: string;
  plate: string;
  cameraId: string;
  cameraName: string;
  timestamp: Date;
  status: "recognized" | "unknown" | "blocked";
  confidence: number;
}

const detectionLogs: DetectionLog[] = [
  { id: "1", plate: "01 A 789 GH", cameraId: "cam-01", cameraName: "Въезд A", timestamp: new Date(Date.now() - 2 * 60 * 1000), status: "recognized", confidence: 94 },
  { id: "2", plate: "01 B 456 DE", cameraId: "cam-02", cameraName: "Въезд B", timestamp: new Date(Date.now() - 5 * 60 * 1000), status: "recognized", confidence: 98 },
  { id: "3", plate: "XX X 000 XX", cameraId: "cam-01", cameraName: "Въезд A", timestamp: new Date(Date.now() - 12 * 60 * 1000), status: "unknown", confidence: 65 },
  { id: "4", plate: "01 C 123 AB", cameraId: "cam-03", cameraName: "Выезд A", timestamp: new Date(Date.now() - 18 * 60 * 1000), status: "recognized", confidence: 91 },
  { id: "5", plate: "BL 123 XYZ", cameraId: "cam-01", cameraName: "Въезд A", timestamp: new Date(Date.now() - 25 * 60 * 1000), status: "blocked", confidence: 99 },
];

export default function AdminCameras() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const getStatusBadge = (status: DetectionLog["status"]) => {
    switch (status) {
      case "recognized":
        return <Badge className="bg-parking-available text-white border-0">Распознан</Badge>;
      case "unknown":
        return <Badge className="bg-parking-reserved text-white border-0">Неизвестен</Badge>;
      case "blocked":
        return <Badge className="bg-parking-occupied text-white border-0">Заблокирован</Badge>;
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("ru", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Камеры</h1>
          <p className="text-muted-foreground">Система распознавания автомобилей</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2" data-testid="button-refresh-cameras">
            <RefreshCw className="h-4 w-4" />
            Обновить
          </Button>
          <Button variant="outline" size="icon" data-testid="button-camera-settings">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-parking-available animate-pulse" />
            <span className="text-sm">
              {cameras.filter((c) => c.isLive).length} активных камер
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-parking-occupied" />
            <span className="text-sm">
              {cameras.filter((c) => !c.isLive).length} офлайн
            </span>
          </div>
        </div>
        
        <div className="flex rounded-lg border p-1">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            data-testid="button-view-grid"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            data-testid="button-view-list"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="cameras" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cameras" className="gap-2" data-testid="tab-cameras">
            <Camera className="h-4 w-4" />
            Камеры
          </TabsTrigger>
          <TabsTrigger value="logs" className="gap-2" data-testid="tab-logs">
            Журнал распознавания
            <Badge variant="secondary">{detectionLogs.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cameras">
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
            {cameras.map((camera) => (
              <CameraPanel
                key={camera.id}
                cameraId={camera.id}
                cameraName={camera.name}
                isLive={camera.isLive}
                onManualEntry={() => console.log("Manual entry for:", camera.id)}
                onBlockVehicle={(plate) => console.log("Block:", plate)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Последние распознавания</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Время</TableHead>
                    <TableHead>Номер</TableHead>
                    <TableHead>Камера</TableHead>
                    <TableHead>Уверенность</TableHead>
                    <TableHead>Статус</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detectionLogs.map((log) => (
                    <TableRow key={log.id} data-testid={`log-${log.id}`}>
                      <TableCell className="text-muted-foreground">
                        {formatTime(log.timestamp)}
                      </TableCell>
                      <TableCell className="font-mono font-medium">
                        {log.plate}
                      </TableCell>
                      <TableCell>{log.cameraName}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${log.confidence}%` }}
                            />
                          </div>
                          <span className="text-sm">{log.confidence}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(log.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
