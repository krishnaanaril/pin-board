import { useLocation, useSearchParams } from "react-router";
import usePinBoardStore from "@/store/pinboard-store";
import LocationCard from "./LocationCard";
import { useEffect, useState } from "react";
import PageHeader from "./PageHeader";
import { EmptyMessage } from "./EmptyMessage";

function Saved() {

    const { savedLocations, savedLists } = usePinBoardStore();
    const [searchParams] = useSearchParams();
    const _location = useLocation();

    const [locations, setLocations] = useState<React.JSX.Element[]>([]);

    useEffect(() => {
        const listId = searchParams.get("listId") ? searchParams.get("listId") : null;
        const locationDetailsWithList = savedLocations.map(location => ({...location, list: savedLists.find(list => list.id === location.listId)?.name }));
        const filteredLocations = listId
            ? locationDetailsWithList.filter(location => location.listId === listId)
            : locationDetailsWithList;

        setLocations(filteredLocations.map(location => <LocationCard key={location.id} location={location} />));
    }, [_location, searchParams, savedLocations]);

    return (
        <div className="h-full">
            <PageHeader headerText="Saved Places" />
            {locations}
            {locations.length === 0 && <EmptyMessage message="No saved locations found" />}
        </div>
    )
}

export default Saved;