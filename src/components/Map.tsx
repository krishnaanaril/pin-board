import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import MapPlaceholder from "./MapPlaceholder";
import usePinBoardStore from "@/store/pinboard-store";

function Map() {

    const {activePosition} = usePinBoardStore();

    return (
        <div className="fixed h-full w-full md:max-w-screen-md md:mx-auto">
            <MapContainer
            center={{ lat: activePosition?.lat ?? 51.505, lng: activePosition?.lng ?? -0.09 }}
            zoom={15}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%'}}
            placeholder={<MapPlaceholder />}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
        </MapContainer>
        </div>
    );
}

export default Map;