import usePinBoardStore from "@/store/pinboard-store";
import { useEffect } from "react"
import { Marker, Popup, useMapEvents } from "react-leaflet"


function LocationMarker() {    
    const {activePosition,  updateActivePosition} = usePinBoardStore();
    const map = useMapEvents({
        click(e: any) {            
            updateActivePosition({...e.latlng, text: 'New location'});
        },
        locationerror(e: any) {
            console.error(e);
        },
        locationfound(e: any) {
            updateActivePosition({...e.latlng, text: 'You are here'});
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    useEffect(() => {
        if(!activePosition) {           
            console.log('map locate') ;
            map.locate();
        } else {
            console.log(activePosition);
            map.flyTo(activePosition, map.getZoom());
        }
    }, [map, activePosition]);

    return activePosition === null ? null : (
        <Marker position={activePosition}>
            <Popup>{activePosition.text}</Popup>
        </Marker>
    )
}

export default LocationMarker;