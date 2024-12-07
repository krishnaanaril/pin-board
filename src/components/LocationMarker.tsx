import { useEffect, useState } from "react"
import { Marker, Popup, useMapEvents } from "react-leaflet"

function LocationMarker({onMarkerChange}: any) {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        click(e: any) {
            console.log(e.latlng);
            setPosition(e.latlng);
            onMarkerChange(e.latlng);
        },
        locationerror(e: any) {
            console.error(e);
        },
        locationfound(e: any) {
            setPosition(e.latlng);
            onMarkerChange(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    useEffect(() => {
        map.locate();
    }, [map]);

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

export default LocationMarker;