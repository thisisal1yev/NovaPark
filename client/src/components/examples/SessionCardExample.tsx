import SessionCard from "../SessionCard";

// todo: remove mock data
const mockSession = {
  id: "1",
  parkingName: "ТЦ Mega Planet",
  parkingAddress: "ул. Мустакиллик, 75",
  spotNumber: "A-42",
  vehiclePlate: "01 A 123 BC",
  startTime: new Date(Date.now() - 45 * 60 * 1000),
  pricePerHour: 5000,
  discountPercent: 15,
};

export default function SessionCardExample() {
  return (
    <div className="max-w-md">
      <SessionCard
        session={mockSession}
        onEndSession={(id) => console.log("End session:", id)}
        onNavigate={(id) => console.log("Navigate:", id)}
      />
    </div>
  );
}
