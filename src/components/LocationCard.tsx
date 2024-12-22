import { LocationDetails } from "@/store/model";
import { Button } from "./ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Link } from "react-router";
import usePinBoardStore from "@/store/pinboard-store";
import SaveLocation from "./SaveLocation";

function LocationCard({ location }: { location: LocationDetails }) {

    const { deleteSavedLocation } = usePinBoardStore();    

    return (
        <Card>
            <CardHeader>
                <CardTitle>{location.name}</CardTitle>
                <CardDescription>{location.note}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
                <Button>
                    <Link to={`/?id=${location.id}`}>
                        View
                    </Link>
                </Button>
                <SaveLocation editLocation={location}/>
                <Button onClick={() => deleteSavedLocation(location.id)}>Delete</Button>
            </CardFooter>
        </Card>
    );
}

export default LocationCard;