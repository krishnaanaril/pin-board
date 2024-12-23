// import { ArrowLeft } from "lucide-react";
// import { Button } from "./ui/button";
import { useLocation, useSearchParams } from "react-router";
import usePinBoardStore from "@/store/pinboard-store";
import LocationCard from "./LocationCard";
import { useEffect, useState } from "react";
import PageHeader from "./PageHeader";
// import PageFooter from "./PageFooter";

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

    // function handleBackClick() {
    //     window.history.back();
    // }

    return (
        <div className="block h-full w-screen overflow-y-scroll">
            <PageHeader headerText="Saved Places"/>
            <div>
                {locations}
                {locations.length === 0 && (
                    <div className="flex flex-col justify-center items-center p-4">
                        <img className="size-48" src="/public/nodata.svg" alt="No data" />
                        <p className="text-center text-xl font-bold my-2">No saved locations found</p>
                    </div>
                )}
            </div>
            {/* <PageFooter/>
            <div className="fixed w-full bottom-0 py-4 flex place-content-evenly bg-opacity-50 backdrop-blur-lg">
                <Button id="back-button" onClick={handleBackClick} asChild>
                    <div>
                        <ArrowLeft />
                        Back
                    </div>
                </Button>
            </div> */}
        </div>
    )
}

export default Saved;