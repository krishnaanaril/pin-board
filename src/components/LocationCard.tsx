import { LocationDetails } from "@/store/model";
import { Button } from "./ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Link } from "react-router";
import usePinBoardStore from "@/store/pinboard-store";
import SaveLocation from "./SaveLocation";
import { useToast } from "@/hooks/use-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

function LocationCard({ location }: { location: LocationDetails }) {

    const { deleteSavedLocation } = usePinBoardStore();
    const { toast } = useToast();   
    const [open, setOpen] = useState(false);
    
    function handleDeleteClick() {        
        setOpen(true);
    }

    function deleteContinueClick(list: LocationDetails) {
        deleteSavedLocation(list.id);
            toast({
                variant: "destructive",
                description: `Location '${list.name}' deleted.`,
            });
        }

    return (
        <>
        <Card className="bg-gray-100">
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
                <Button id="delete-button" onClick={handleDeleteClick}>Delete</Button>
            </CardFooter>
        </Card>
        <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    saved location.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteContinueClick(location)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    </>
    );
}

export default LocationCard;