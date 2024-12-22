import { LocationDetails } from "@/store/model";
import { Button } from "./ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Link } from "react-router";
import usePinBoardStore from "@/store/pinboard-store";
import SaveLocation from "./SaveLocation";
import { useToast } from "@/hooks/use-toast";

function LocationCard({ location }: { location: LocationDetails }) {

    const { deleteSavedLocation } = usePinBoardStore();
    const { toast } = useToast();   
    
    function handleDeleteClick(list: LocationDetails) {
        deleteSavedLocation(list.id);
            toast({
                variant: "destructive",
                description: `List '${list.name}' deleted.`,
            });
        }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{location.name}</CardTitle>
                <CardDescription>{location.note}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
                <Button id="view-button">
                    <Link to={`/?id=${location.id}`}>
                        View
                    </Link>
                </Button>
                <SaveLocation editLocation={location}/>
                <Button id="delete-button" onClick={() => handleDeleteClick(location)}>Delete</Button>
            </CardFooter>
        </Card>
    );
}

export default LocationCard;