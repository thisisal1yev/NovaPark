import { useState } from "react";
import { Clock, History, Calendar, Car } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import SessionCard, { ParkingSession } from "@/components/SessionCard";

// todo: remove mock data
const mockActiveSessions: ParkingSession[] = [
  {
    id: "1",
    parkingName: "ТЦ Mega Planet",
    parkingAddress: "ул. Мустакиллик, 75",
    spotNumber: "A-42",
    vehiclePlate: "01 A 123 BC",
    startTime: new Date(Date.now() - 45 * 60 * 1000),
    pricePerHour: 5000,
    discountPercent: 15,
  },
];

interface HistorySession {
  id: string;
  parkingName: string;
  date: Date;
  duration: string;
  totalCost: number;
  vehiclePlate: string;
}

const mockHistory: HistorySession[] = [
  {
    id: "h1",
    parkingName: "ТЦ Samarqand Darvoza",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    duration: "2ч 15м",
    totalCost: 9000,
    vehiclePlate: "01 A 123 BC",
  },
  {
    id: "h2",
    parkingName: "Бизнес-центр Пойтахт",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    duration: "4ч 30м",
    totalCost: 27000,
    vehiclePlate: "01 B 456 DE",
  },
  {
    id: "h3",
    parkingName: "ТЦ Mega Planet",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    duration: "1ч 45м",
    totalCost: 8750,
    vehiclePlate: "01 A 123 BC",
  },
];

export default function SessionsPage() {
  const [activeSessions, setActiveSessions] = useState(mockActiveSessions);
  const [endingSessionId, setEndingSessionId] = useState<string | null>(null);

  const handleEndSession = (id: string) => {
    setEndingSessionId(id);
  };

  const confirmEndSession = () => {
    if (endingSessionId) {
      setActiveSessions((prev) => prev.filter((s) => s.id !== endingSessionId));
      setEndingSessionId(null);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ru", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Мои сессии</h1>
        <p className="text-muted-foreground">Управление активными парковками и история</p>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active" className="gap-2" data-testid="tab-active">
            <Clock className="h-4 w-4" />
            Активные
            {activeSessions.length > 0 && (
              <Badge className="ml-1">{activeSessions.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2" data-testid="tab-history">
            <History className="h-4 w-4" />
            История
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeSessions.length > 0 ? (
            activeSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onEndSession={handleEndSession}
                onNavigate={(id) => console.log("Navigate to:", id)}
              />
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Clock className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">Нет активных сессий</h3>
                <p className="text-muted-foreground mb-4">
                  Забронируйте парковочное место, чтобы начать сессию
                </p>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                  Найти парковку
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {mockHistory.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Последние парковки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockHistory.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover-elevate transition-all"
                    data-testid={`history-${session.id}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                        <Car className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{session.parkingName}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{formatDate(session.date)}</span>
                          <span className="text-muted">•</span>
                          <span>{session.duration}</span>
                          <span className="text-muted">•</span>
                          <span className="font-mono">{session.vehiclePlate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{session.totalCost.toLocaleString()} сум</p>
                      <Badge variant="outline" className="text-xs">Оплачено</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <History className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">История пуста</h3>
                <p className="text-muted-foreground">
                  Здесь будут отображаться ваши прошлые парковки
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <AlertDialog open={!!endingSessionId} onOpenChange={() => setEndingSessionId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Завершить сессию?</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите завершить текущую парковочную сессию? 
              Будет произведена оплата за использованное время.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={confirmEndSession}>
              Завершить и оплатить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
