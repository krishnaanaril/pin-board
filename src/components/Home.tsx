import { Bookmark, Share } from "lucide-react";
import Map from "./Map";
import { Button } from "./ui/button";
import { Link, useLocation, useSearchParams } from "react-router";
import usePinBoardStore from "@/store/pinboard-store";
import SaveLocation from "./SaveLocation";
import { LatLng, LocationDetails } from "@/store/model";
import { useEffect } from "react";

function Home() {

    const [searchParams] = useSearchParams();
    const { savedLocations, activePosition, updateActivePosition } = usePinBoardStore();
    const location = useLocation();

    useEffect(() => {
        const idQuery = searchParams.get('id');
        const defaultPosition: LatLng = {
            lat: 51.505,
            lng: -0.09
        };

        const id: number | undefined = idQuery ? parseInt(idQuery) : undefined;
        const currentLocation: LocationDetails | undefined = id ? savedLocations.filter(location => location.id == id)?.at(0) : undefined;

        if(currentLocation) {
            const currentPosition = currentLocation.position ?? defaultPosition;
            console.log(currentPosition);
            updateActivePosition(currentPosition);
        }
    }, [location]);

    function getGeoIntent(position: any, label: string): string {
        return position ?
            `geo:${position.lat},${position.lng}?q=${position.lat},${position.lng}(${label})` :
            '';
    }

    return (
        <div className="h-screen w-screen">
            <Map />
            <div className="fixed w-full bottom-6 flex place-content-evenly">
                <Button asChild>
                    <Link to="/saved">
                        <Bookmark />
                        Saved
                    </Link>
                </Button>
                <SaveLocation/>
                <Button disabled={!activePosition} asChild>
                    <Link to={getGeoIntent(activePosition, 'Pin Board')} target="_blank">
                        <Share />
                        Share
                    </Link>
                </Button>

            </div>
        </div>
    );
}

export default Home;