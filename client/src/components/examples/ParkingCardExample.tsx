import ParkingCard from "../ParkingCard";

// todo: remove mock data
const mockParking = {
  id: "1",
  name: "ТЦ Mega Planet",
  address: "ул. Мустакиллик, 75",
  totalSpots: 200,
  availableSpots: 45,
  pricePerHour: 5000,
  hasCharging: true,
  distance: "1.2 км",
};

export default function ParkingCardExample() {
  return (
    <div className="max-w-sm">
      <ParkingCard
        parking={mockParking}
        onBook={(id) => console.log("Book parking:", id)}
        onViewDetails={(id) => console.log("View details:", id)}
      />
    </div>
  );
}
