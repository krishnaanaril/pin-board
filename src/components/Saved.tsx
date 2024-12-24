import { useLocation, useSearchParams } from "react-router";
import usePinBoardStore from "@/store/pinboard-store";
import LocationCard from "./LocationCard";
import { useEffect, useState } from "react";
import PageHeader from "./PageHeader";
import { EmptyMessage } from "./EmptyMessage";

function Saved() {

    const { savedLocations } = usePinBoardStore();
    const [searchParams] = useSearchParams();
    const location = useLocation();

    const [locations, setLocations] = useState<React.JSX.Element[]>([]);

    useEffect(() => {
        const listId = searchParams.get("listId") ? searchParams.get("listId") : null;
        const filteredLocations = listId
            ? savedLocations.filter(location => location.listId === listId)
            : savedLocations;

        setLocations(filteredLocations.map(location => <LocationCard key={location.id} location={location} />));
    }, [location, searchParams, savedLocations]);

    return (
        <div className="h-full">
            <PageHeader headerText="Saved Places" />
            {locations}
            {locations.length === 0 && <EmptyMessage message="No saved locations found" />}
        </div>
    )
}

export default Saved;