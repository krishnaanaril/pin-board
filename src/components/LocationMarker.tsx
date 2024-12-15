import usePinBoardStore from "@/store/pinboard-store";
import { useEffect } from "react"
import { Marker, Popup, useMapEvents } from "react-leaflet"


function LocationMarker() {    
    const {activePosition,  updateActivePosition} = usePinBoardStore();
    const map = useMapEvents({
        click(e: any) {            
            updateActivePosition(e.latlng);
        },
        locationerror(e: any) {
            console.error(e);
        },
        locationfound(e: any) {
            updateActivePosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    useEffect(() => {
        map.locate();
    }, [map]);

    return activePosition === null ? null : (
        <Marker position={activePosition}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

export default LocationMarker;