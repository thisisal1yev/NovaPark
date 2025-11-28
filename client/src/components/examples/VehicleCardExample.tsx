import VehicleCard from "../VehicleCard";

// todo: remove mock data
const mockVehicle = {
  id: "1",
  plate: "01 A 123 BC",
  model: "Chevrolet Malibu",
  color: "Белый",
  isDefault: true,
  region: "Ташкент",
};

export default function VehicleCardExample() {
  return (
    <div className="max-w-md">
      <VehicleCard
        vehicle={mockVehicle}
        onEdit={(id) => console.log("Edit:", id)}
        onDelete={(id) => console.log("Delete:", id)}
        onSetDefault={(id) => console.log("Set default:", id)}
      />
    </div>
  );
}
