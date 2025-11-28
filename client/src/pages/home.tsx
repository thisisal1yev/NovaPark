import { useState } from "react";
import { Search, Filter, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ParkingMap, { ParkingLocation } from "@/components/ParkingMap";
import ParkingCard from "@/components/ParkingCard";
import BookingModal from "@/components/BookingModal";

// todo: remove mock data
const mockParkings: ParkingLocation[] = [
  {
    id: "1",
    name: "ТЦ Mega Planet",
    address: "ул. Мустакиллик, 75",
    lat: 41.3111,
    lng: 69.2797,
    totalSpots: 200,
    availableSpots: 45,
    pricePerHour: 5000,
    hasCharging: true,
  },
  {
    id: "2",
    name: "ТЦ Samarqand Darvoza",
    address: "ул. Коратош, 5А",
    lat: 41.2989,
    lng: 69.2547,
    totalSpots: 150,
    availableSpots: 12,
    pricePerHour: 4000,
    hasCharging: false,
  },
  {
    id: "3",
    name: "Бизнес-центр Пойтахт",
    address: "пр. Амира Темура, 107",
    lat: 41.3045,
    lng: 69.2689,
    totalSpots: 100,
    availableSpots: 78,
    pricePerHour: 6000,
    hasCharging: true,
  },
  {
    id: "4",
    name: "ТЦ Next",
    address: "ул. Шота Руставели, 22",
    lat: 41.2867,
    lng: 69.2201,
    totalSpots: 80,
    availableSpots: 5,
    pricePerHour: 3500,
    hasCharging: false,
  },
  {
    id: "5",
    name: "Гостиница Интернациональ",
    address: "ул. Амира Темура, 107Б",
    lat: 41.3089,
    lng: 69.2756,
    totalSpots: 60,
    availableSpots: 32,
    pricePerHour: 7000,
    hasCharging: true,
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedParking, setSelectedParking] = useState<string | null>(null);
  const [bookingParkingId, setBookingParkingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [onlyWithCharging, setOnlyWithCharging] = useState(false);
  const [onlyAvailable, setOnlyAvailable] = useState(true);

  const filteredParkings = mockParkings.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = p.pricePerHour >= priceRange[0] && p.pricePerHour <= priceRange[1];
    const matchesCharging = !onlyWithCharging || p.hasCharging;
    const matchesAvailable = !onlyAvailable || p.availableSpots > 0;
    return matchesSearch && matchesPrice && matchesCharging && matchesAvailable;
  });

  const bookingParking = mockParkings.find((p) => p.id === bookingParkingId);
  const activeFiltersCount = [
    priceRange[0] > 0 || priceRange[1] < 10000,
    onlyWithCharging,
    onlyAvailable,
  ].filter(Boolean).length;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="p-4 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск парковок..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                data-testid="input-search"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="gap-2" data-testid="button-filters">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="hidden sm:inline">Фильтры</span>
                    {activeFiltersCount > 0 && (
                      <Badge className="ml-1">{activeFiltersCount}</Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Фильтры</SheetTitle>
                    <SheetDescription>Настройте параметры поиска парковок</SheetDescription>
                  </SheetHeader>
                  <div className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <Label>Цена за час: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} сум</Label>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={10000}
                        step={500}
                        className="mt-2"
                        data-testid="slider-price"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="charging">Только с зарядкой EV</Label>
                      <Switch
                        id="charging"
                        checked={onlyWithCharging}
                        onCheckedChange={setOnlyWithCharging}
                        data-testid="switch-charging"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="available">Только со свободными местами</Label>
                      <Switch
                        id="available"
                        checked={onlyAvailable}
                        onCheckedChange={setOnlyAvailable}
                        data-testid="switch-available"
                      />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex rounded-lg border p-1">
                <Button
                  variant={viewMode === "map" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                  data-testid="button-view-map"
                >
                  Карта
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  data-testid="button-view-list"
                >
                  Список
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
            <span>Найдено: {filteredParkings.length} парковок</span>
            <span className="text-muted">•</span>
            <span className="text-parking-available flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-parking-available" />
              {filteredParkings.reduce((sum, p) => sum + p.availableSpots, 0)} свободных мест
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {viewMode === "map" ? (
          <ParkingMap
            parkings={filteredParkings}
            center={[41.2995, 69.2401]}
            zoom={13}
            selectedParkingId={selectedParking || undefined}
            onSelectParking={setSelectedParking}
            onBookParking={setBookingParkingId}
          />
        ) : (
          <div className="h-full overflow-auto p-4">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredParkings.map((parking) => (
                  <ParkingCard
                    key={parking.id}
                    parking={{
                      ...parking,
                      imageUrl: undefined,
                    }}
                    onBook={setBookingParkingId}
                    onViewDetails={setSelectedParking}
                  />
                ))}
              </div>
              {filteredParkings.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Парковки не найдены</p>
                  <p className="text-sm">Попробуйте изменить фильтры или поисковый запрос</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {bookingParking && (
        <BookingModal
          isOpen={!!bookingParkingId}
          onClose={() => setBookingParkingId(null)}
          parkingName={bookingParking.name}
          pricePerHour={bookingParking.pricePerHour}
          onConfirm={(data) => {
            console.log("Booking:", data);
            setBookingParkingId(null);
          }}
        />
      )}
    </div>
  );
}
