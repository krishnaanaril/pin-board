import { Bookmark, Share, LocateFixed, List } from "lucide-react";
import Map from "./Map";
import { Button } from "./ui/button";
import { Link, useLocation, useSearchParams } from "react-router";
import usePinBoardStore from "@/store/pinboard-store";
import SaveLocation from "./SaveLocation";
import { LatLng, LocationDetails } from "@/store/model";
import { useEffect, useState } from "react";

function Home() {

    const [searchParams] = useSearchParams();
    const { savedLocations, activePosition, updateActivePosition } = usePinBoardStore();
    const location = useLocation();
    const [currentLocation, setCurrentLocation] = useState<LocationDetails | undefined>(undefined);

    useEffect(() => {
        const idQuery = searchParams.get('id');
        const defaultPosition: LatLng = {
            lat: 51.505,
            lng: -0.09
        };

        const id: string | undefined = idQuery ? idQuery : undefined;
        const _currentLocation: LocationDetails | undefined = id ? savedLocations.filter(location => location.id == id)?.at(0) : undefined;
        setCurrentLocation(_currentLocation);

        if(_currentLocation) {
            const currentPosition = _currentLocation.position ?? defaultPosition;
            console.log(currentPosition);
            updateActivePosition(currentPosition);
        }
    }, [location]);

    function getGeoIntent(position: any, label: string): string {
        return position ?
            `geo:${position.lat},${position.lng}?q=${position.lat},${position.lng}(${label})` :
            '';
    }

    function goToCurrentLocation() {
        updateActivePosition(null);
    }

    return (
        <div className="h-screen w-screen">
            <Map />
            <Button id="current-location-button" className="fixed bottom-20 right-6" onClick={goToCurrentLocation}>
                <LocateFixed size={64}/>                
            </Button>
            <div className="fixed w-full bottom-0 py-4 flex place-content-evenly bg-opacity-50 backdrop-blur-lg">
                <Button id="saved-locations-button" asChild>
                    <Link id="saved-link" to="/saved">
                        <Bookmark />
                        Saved
                    </Link>
                </Button>
                <Button id="lists-button" asChild>
                    <Link id="lists-link" to="/lists">
                        <List />
                        Lists
                    </Link>
                </Button>
                <SaveLocation/>
                <Button id="share-location-button" disabled={!activePosition} asChild>
                    <Link id="share-link"to={getGeoIntent(activePosition, currentLocation?.name ?? 'Pin Board')} target="_blank">
                        <Share />
                        Share
                    </Link>
                </Button>
            </div>
        </div>
    );
}

export default Home;