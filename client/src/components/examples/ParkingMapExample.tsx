import ParkingMap from "../ParkingMap";

// todo: remove mock data
const mockParkings = [
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
];

export default function ParkingMapExample() {
  return (
    <div className="h-[400px] w-full">
      <ParkingMap
        parkings={mockParkings}
        center={[41.3045, 69.2689]}
        zoom={14}
        onSelectParking={(id) => console.log("Selected:", id)}
        onBookParking={(id) => console.log("Book:", id)}
      />
    </div>
  );
}
