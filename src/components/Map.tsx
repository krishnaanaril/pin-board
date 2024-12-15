import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import MapPlaceholder from "./MapPlaceholder";

function Map() {
    return (
        <div className="fixed h-full w-full">
            <MapContainer
            center={{ lat: 51.505, lng: -0.09 }}
            zoom={13}
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