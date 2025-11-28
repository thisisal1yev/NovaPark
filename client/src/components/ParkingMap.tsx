import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Car, MapPin, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface ParkingLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  totalSpots: number;
  availableSpots: number;
  pricePerHour: number;
  hasCharging?: boolean;
}

interface ParkingMapProps {
  parkings: ParkingLocation[];
  center?: [number, number];
  zoom?: number;
  onSelectParking?: (id: string) => void;
  onBookParking?: (id: string) => void;
  selectedParkingId?: string;
}

const getMarkerIcon = (available: number, total: number) => {
  const ratio = available / total;
  let color = "#22c55e";
  if (ratio <= 0.2) color = "#ef4444";
  else if (ratio <= 0.5) color = "#f59e0b";

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background: ${color};
        width: 36px;
        height: 36px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        <span style="
          transform: rotate(45deg);
          color: white;
          font-weight: bold;
          font-size: 12px;
        ">${available}</span>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
};

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}

export default function ParkingMap({
  parkings,
  center = [41.2995, 69.2401],
  zoom = 13,
  onSelectParking,
  onBookParking,
  selectedParkingId,
}: ParkingMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  return (
    <div className="relative h-full w-full rounded-lg overflow-hidden" data-testid="parking-map">
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full"
        ref={mapRef}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController center={center} zoom={zoom} />
        
        {parkings.map((parking) => (
          <Marker
            key={parking.id}
            position={[parking.lat, parking.lng]}
            icon={getMarkerIcon(parking.availableSpots, parking.totalSpots)}
            eventHandlers={{
              click: () => onSelectParking?.(parking.id),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">{parking.name}</h3>
                  {parking.hasCharging && (
                    <Zap className="h-4 w-4 text-parking-available flex-shrink-0" />
                  )}
                </div>
                
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{parking.address}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{parking.availableSpots}</span>
                    <span className="text-muted-foreground">/ {parking.totalSpots}</span>
                  </div>
                  <Badge variant="secondary">
                    {parking.pricePerHour.toLocaleString()} сум/ч
                  </Badge>
                </div>

                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookParking?.(parking.id);
                  }}
                  disabled={parking.availableSpots === 0}
                  data-testid={`map-book-${parking.id}`}
                >
                  Забронировать
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-lg z-[1000]">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-parking-available" />
            <span>Свободно</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-parking-reserved" />
            <span>Мало</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-parking-occupied" />
            <span>Занято</span>
          </div>
        </div>
      </div>
    </div>
  );
}
