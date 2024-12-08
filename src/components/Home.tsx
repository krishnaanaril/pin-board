import { Bookmark, MapPinPlus, Share } from "lucide-react";
import Map from "./Map";
import { Button } from "./ui/button";
import { Link } from "react-router";
import usePinBoardStore from "@/store/pinboard-store";


function Home() {
    const {activePosition} = usePinBoardStore();    

    function getGeoIntent(position: any, label: string): string {
        return position ? 
        `geo:${position.lat},${position.lng}?q=${position.lat},${position.lng}(${label})` :
        '';
    }

    return (
        <div className="h-screen w-screen">
            <Map/>
            <div className="fixed w-full bottom-6 flex place-content-evenly">
                <Button>
                    <Bookmark />
                    Saved
                </Button>
                <Button>
                    <MapPinPlus />
                    Add
                </Button>
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