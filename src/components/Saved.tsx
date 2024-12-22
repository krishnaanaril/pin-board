import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useLocation, useSearchParams } from "react-router";
import usePinBoardStore from "@/store/pinboard-store";
import LocationCard from "./LocationCard";
import { useEffect, useState } from "react";
import PageHeader from "./PageHeader";

function Saved() {

    const { savedLocations } = usePinBoardStore();
    const [searchParams] = useSearchParams();
    const location = useLocation();

    const [locations, setLocations] = useState<React.JSX.Element[]>([]);

    useEffect(() => {
        const listId = searchParams.get("listId") ? Number(searchParams.get("listId")) : null;
        const filteredLocations = listId
            ? savedLocations.filter(location => location.listId === listId)
            : savedLocations;

        setLocations(filteredLocations.map(location => <LocationCard key={location.id} location={location} />));
    }, [location, searchParams, savedLocations]);

    function handleBackClick() {
        window.history.back();
    }

    return (
        <>
            <PageHeader headerText="Saved Places" />
            {locations}
            <div className="fixed w-full bottom-6 flex place-content-evenly">
                <Button onClick={handleBackClick} asChild>
                    <div>
                        <ArrowLeft />
                        Back
                    </div>
                </Button>
            </div>
        </>
    )
}

export default Saved;