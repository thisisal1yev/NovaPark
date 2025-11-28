import { useState } from "react";
import { Button } from "@/components/ui/button";
import BookingModal from "../BookingModal";

export default function BookingModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        Открыть форму бронирования
      </Button>
      <BookingModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        parkingName="ТЦ Mega Planet"
        pricePerHour={5000}
        onConfirm={(data) => {
          console.log("Booking confirmed:", data);
          setIsOpen(false);
        }}
      />
    </div>
  );
}
