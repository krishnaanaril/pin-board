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
        const listId = searchParams.get("listId") ? searchParams.get("listId") : null;
        const filteredLocations = listId
            ? savedLocations.filter(location => location.listId === listId)
            : savedLocations;

        setLocations(filteredLocations.map(location => <LocationCard key={location.id} location={location} />));
    }, [location, searchParams, savedLocations]);

    return (
        <div className="h-full">
            <PageHeader headerText="Saved Places"/>
            <div className="h-3/4 flex flex-col justify-center">
                {locations}
                {locations.length === 0 && (
                    <div className="flex flex-col justify-center items-center p-4">
                        <img className="size-48" src="/nodata.svg" alt="No data" />
                        <p className="text-center font-bold my-2">No saved locations found</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Saved;