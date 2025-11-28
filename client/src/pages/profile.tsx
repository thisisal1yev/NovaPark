import { useState } from "react";
import { User, Car, Gift, Settings, Plus, Camera, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import VehicleCard, { Vehicle } from "@/components/VehicleCard";
import { DiscountList, DiscountType } from "@/components/DiscountBadge";

// todo: remove mock data
const mockUser = {
  name: "Алексей Петров",
  email: "alexey@example.com",
  phone: "+998 90 123 45 67",
  region: "Ташкент",
  birthday: new Date(1990, 5, 15),
  memberSince: new Date(2023, 2, 10),
  totalVisits: 47,
  totalSpent: 1250000,
};

const mockVehicles: Vehicle[] = [
  { id: "1", plate: "01 A 123 BC", model: "Chevrolet Malibu", color: "Белый", isDefault: true, region: "Ташкент" },
  { id: "2", plate: "01 B 456 DE", model: "Kia K5", color: "Черный", isDefault: false, region: "Ташкент" },
];

const mockDiscounts = [
  { type: "loyal_customer" as DiscountType, percent: 10, label: "Постоянный клиент", description: "10+ визитов" },
  { type: "visit_bonus" as DiscountType, percent: 5, label: "Бонус за визиты", description: "47 визитов" },
];

export default function ProfilePage() {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ plate: "", model: "", color: "" });

  const handleDeleteVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setVehicles((prev) =>
      prev.map((v) => ({ ...v, isDefault: v.id === id }))
    );
  };

  const handleAddVehicle = () => {
    if (newVehicle.plate && newVehicle.model) {
      setVehicles((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          ...newVehicle,
          isDefault: prev.length === 0,
          region: "Ташкент",
        },
      ]);
      setNewVehicle({ plate: "", model: "", color: "" });
      setIsAddingVehicle(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ru", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src="" alt={mockUser.name} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  АП
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                data-testid="button-change-avatar"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold" data-testid="text-user-name">{mockUser.name}</h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {mockUser.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {mockUser.phone}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                <Badge variant="secondary" className="gap-1">
                  <MapPin className="h-3 w-3" />
                  {mockUser.region}
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Calendar className="h-3 w-3" />
                  С {formatDate(mockUser.memberSince)}
                </Badge>
              </div>
            </div>

            <div className="flex gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{mockUser.totalVisits}</p>
                <p className="text-sm text-muted-foreground">Визитов</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{(mockUser.totalSpent / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-muted-foreground">сум</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="vehicles" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="vehicles" className="gap-2" data-testid="tab-vehicles">
            <Car className="h-4 w-4" />
            Автомобили
          </TabsTrigger>
          <TabsTrigger value="discounts" className="gap-2" data-testid="tab-discounts">
            <Gift className="h-4 w-4" />
            Скидки
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2" data-testid="tab-settings">
            <Settings className="h-4 w-4" />
            Настройки
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vehicles" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Мои автомобили</h2>
            <Dialog open={isAddingVehicle} onOpenChange={setIsAddingVehicle}>
              <DialogTrigger asChild>
                <Button className="gap-2" data-testid="button-add-vehicle">
                  <Plus className="h-4 w-4" />
                  Добавить
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Добавить автомобиль</DialogTitle>
                  <DialogDescription>
                    Введите данные вашего автомобиля
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="plate">Номер</Label>
                    <Input
                      id="plate"
                      placeholder="01 A 123 BC"
                      value={newVehicle.plate}
                      onChange={(e) => setNewVehicle({ ...newVehicle, plate: e.target.value })}
                      data-testid="input-plate"
                    />
                  </div>
                  <div>
                    <Label htmlFor="model">Модель</Label>
                    <Input
                      id="model"
                      placeholder="Chevrolet Malibu"
                      value={newVehicle.model}
                      onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                      data-testid="input-model"
                    />
                  </div>
                  <div>
                    <Label htmlFor="color">Цвет</Label>
                    <Input
                      id="color"
                      placeholder="Белый"
                      value={newVehicle.color}
                      onChange={(e) => setNewVehicle({ ...newVehicle, color: e.target.value })}
                      data-testid="input-color"
                    />
                  </div>
                  <Button onClick={handleAddVehicle} className="w-full" data-testid="button-save-vehicle">
                    Сохранить
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {vehicles.length > 0 ? (
            <div className="space-y-3">
              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onEdit={(id) => console.log("Edit:", id)}
                  onDelete={handleDeleteVehicle}
                  onSetDefault={handleSetDefault}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Car className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">Нет автомобилей</h3>
                <p className="text-muted-foreground">Добавьте ваш первый автомобиль</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="discounts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Ваши скидки
              </CardTitle>
              <CardDescription>
                Скидки применяются автоматически при бронировании
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <DiscountList discounts={mockDiscounts} maxDisplay={10} />
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Как получить больше скидок?</h3>
                <div className="grid gap-3">
                  {[
                    { icon: User, title: "Первый визит", desc: "15% скидка для новых пользователей", unlocked: true },
                    { icon: MapPin, title: "Другой регион", desc: "20% при парковке в другом городе", unlocked: false },
                    { icon: Calendar, title: "День рождения", desc: "50% скидка в ваш особенный день", unlocked: false },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 p-3 rounded-lg ${item.unlocked ? "bg-parking-available/10" : "bg-muted/50"}`}
                    >
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${item.unlocked ? "bg-parking-available/20" : "bg-muted"}`}>
                        <item.icon className={`h-5 w-5 ${item.unlocked ? "text-parking-available" : "text-muted-foreground"}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      {item.unlocked && <Badge className="bg-parking-available text-white border-0">Активна</Badge>}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Личные данные</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Имя</Label>
                  <Input id="name" defaultValue={mockUser.name} data-testid="input-name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={mockUser.email} data-testid="input-email" />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" defaultValue={mockUser.phone} data-testid="input-phone" />
                </div>
                <div>
                  <Label htmlFor="birthday">Дата рождения</Label>
                  <Input
                    id="birthday"
                    type="date"
                    defaultValue={mockUser.birthday.toISOString().split("T")[0]}
                    data-testid="input-birthday"
                  />
                </div>
              </div>
              <Button data-testid="button-save-settings">Сохранить изменения</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
