import Map from "./Map";
import { useLocation, useSearchParams } from "react-router";
import usePinBoardStore from "@/store/pinboard-store";
import { LatLng, LocationDetails } from "@/store/model";
import { useEffect } from "react";

function Home() {

    const [searchParams] = useSearchParams();
    const { savedLocations, updateActivePosition } = usePinBoardStore();
    const location = useLocation();

    useEffect(() => {
        document.title = "Pin Board: Save your locations";
        const idQuery = searchParams.get('id');
        const defaultPosition: LatLng = {
            lat: 51.505,
            lng: -0.09
        };

        const id: string | undefined = idQuery ? idQuery : undefined;
        const _currentLocation: LocationDetails | undefined = id ? savedLocations.filter(location => location.id == id)?.at(0) : undefined;

        if (_currentLocation) {
            const currentPosition = _currentLocation.position ?? defaultPosition;
            updateActivePosition({...currentPosition, text: _currentLocation.position ? _currentLocation.name : 'Start here'});
        }
    }, [location]);

    return (
        <div className="relative h-screen w-screen md:max-w-screen-md md:mx-auto">
            <Map />

        </div>
    );
}

export default Home;