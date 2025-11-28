import CameraPanel from "../CameraPanel";

export default function CameraPanelExample() {
  return (
    <div className="max-w-md">
      <CameraPanel
        cameraId="cam-01"
        cameraName="Въезд A"
        isLive={true}
        onManualEntry={() => console.log("Manual entry")}
        onBlockVehicle={(plate) => console.log("Block vehicle:", plate)}
      />
    </div>
  );
}
