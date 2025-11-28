import { useState } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar as CalendarIcon, Car, Clock, CreditCard, Check, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import DiscountBadge, { DiscountType } from "./DiscountBadge";
import ParkingSpots, { createMockParkingLevels, ParkingLevel } from "./ParkingSpots";

interface Vehicle {
  id: string;
  plate: string;
  model: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  parkingName: string;
  pricePerHour: number;
  vehicles?: Vehicle[];
  parkingLevels?: ParkingLevel[];
  onConfirm?: (booking: {
    date: Date;
    startTime: string;
    duration: number;
    vehicleId: string;
    spotId?: string;
  }) => void;
}

const steps = [
  { id: 1, title: "Дата и время", icon: CalendarIcon },
  { id: 2, title: "Место", icon: MapPin },
  { id: 3, title: "Автомобиль", icon: Car },
  { id: 4, title: "Подтверждение", icon: Check },
];

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
  "20:00", "21:00", "22:00",
];

const durations = [1, 2, 3, 4, 6, 8, 12, 24];

// todo: remove mock data
const mockVehicles: Vehicle[] = [
  { id: "1", plate: "01 A 123 BC", model: "Chevrolet Malibu" },
  { id: "2", plate: "01 B 456 DE", model: "Kia K5" },
];

const mockDiscounts = [
  { type: "loyal_customer" as DiscountType, percent: 10, label: "Постоянный клиент", description: "10+ визитов" },
  { type: "off_peak" as DiscountType, percent: 15, label: "Off-Peak", description: "22:00-08:00" },
];

export default function BookingModal({
  isOpen,
  onClose,
  parkingName,
  pricePerHour,
  vehicles = mockVehicles,
  parkingLevels = createMockParkingLevels(3),
  onConfirm,
}: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<number>(2);
  const [selectedSpot, setSelectedSpot] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");

  const totalDiscount = mockDiscounts.reduce((sum, d) => sum + d.percent, 0);
  const maxDiscount = Math.min(totalDiscount, 50);
  const baseCost = pricePerHour * selectedDuration;
  const discountAmount = baseCost * (maxDiscount / 100);
  const finalCost = baseCost - discountAmount;

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      onConfirm?.({
        date: selectedDate!,
        startTime: selectedTime,
        duration: selectedDuration,
        vehicleId: selectedVehicle,
        spotId: selectedSpot,
      });
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) return selectedDate && selectedTime && selectedDuration;
    if (currentStep === 2) return selectedSpot;
    if (currentStep === 3) return selectedVehicle;
    return true;
  };

  const selectedSpotDisplay = () => {
    if (!selectedSpot) return null;
    const allSpots = parkingLevels.flatMap((level) => level.spots);
    const spot = allSpots.find((s) => s.id === selectedSpot);
    return spot ? `${spot.row}${spot.number}` : null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Бронирование</DialogTitle>
          <DialogDescription>{parkingName}</DialogDescription>
        </DialogHeader>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
                    currentStep >= step.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted-foreground/30"
                  )}
                >
                  <step.icon className="h-4 w-4" />
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 w-8 sm:w-12 mx-0.5",
                      currentStep > step.id ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <Progress value={(currentStep / 4) * 100} className="h-1" />
        </div>

        <div className="min-h-[320px]">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Дата</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      data-testid="button-select-date"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, "PPP", { locale: ru })
                      ) : (
                        <span>Выберите дату</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Время начала</label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger data-testid="select-time">
                    <SelectValue placeholder="Выберите время" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Длительность (часов)</label>
                <Select
                  value={selectedDuration.toString()}
                  onValueChange={(v) => setSelectedDuration(parseInt(v))}
                >
                  <SelectTrigger data-testid="select-duration">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((d) => (
                      <SelectItem key={d} value={d.toString()}>
                        {d} {d === 1 ? "час" : d < 5 ? "часа" : "часов"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="overflow-y-auto max-h-[400px]">
              <ParkingSpots
                levels={parkingLevels}
                selectedSpotId={selectedSpot}
                onSelectSpot={setSelectedSpot}
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <label className="text-sm font-medium mb-2 block">Выберите автомобиль</label>
              <div className="space-y-2">
                {vehicles.map((vehicle) => (
                  <button
                    key={vehicle.id}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                    className={cn(
                      "w-full p-4 rounded-lg border-2 text-left transition-all hover-elevate",
                      selectedVehicle === vehicle.id
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    )}
                    data-testid={`button-vehicle-${vehicle.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <Car className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{vehicle.plate}</p>
                        <p className="text-sm text-muted-foreground">{vehicle.model}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Парковка:</span>
                  <span className="font-medium">{parkingName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Дата:</span>
                  <span className="font-medium">
                    {selectedDate && format(selectedDate, "d MMMM yyyy", { locale: ru })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Время:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Длительность:</span>
                  <span className="font-medium">{selectedDuration} ч.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Место:</span>
                  <span className="font-mono font-bold text-primary" data-testid="text-spot-display">
                    {selectedSpotDisplay()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Автомобиль:</span>
                  <span className="font-medium">
                    {vehicles.find((v) => v.id === selectedVehicle)?.plate}
                  </span>
                </div>
              </div>

              <div className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span>Базовая стоимость:</span>
                  <span>{baseCost.toLocaleString()} сум</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Ваши скидки:</span>
                  <div className="flex gap-1">
                    {mockDiscounts.map((d) => (
                      <DiscountBadge key={d.type} discount={d} />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between text-parking-available">
                  <span>Экономия:</span>
                  <span>-{discountAmount.toLocaleString()} сум</span>
                </div>
                <div className="flex justify-between pt-2 border-t text-lg font-bold">
                  <span className="flex items-center gap-1">
                    <CreditCard className="h-5 w-5" />
                    Итого:
                  </span>
                  <span data-testid="text-final-cost">{finalCost.toLocaleString()} сум</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-4">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              Назад
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600"
            data-testid="button-booking-next"
          >
            {currentStep === 4 ? "Подтвердить" : "Далее"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
