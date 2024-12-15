import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";
import usePinBoardStore from "@/store/pinboard-store";
import LocationCard from "./LocationCard";

function Saved() {

    const { savedLocations } = usePinBoardStore();

    const locations = savedLocations.map(location => <LocationCard key={location.id} location={location}/>)

    return (
        <>
            {locations}
            <div className="fixed w-full bottom-6 flex place-content-evenly">
            <Button asChild>
                    <Link to="/">
                        <ArrowLeft />
                        Back
                    </Link>
                </Button>
            </div>
        </>
    )
}

export default Saved;