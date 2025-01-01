import { LocationDetailsWithList } from "@/store/model";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Link } from "react-router";
import usePinBoardStore from "@/store/pinboard-store";
import SaveLocation from "./SaveLocation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { dateInAgoFormat } from "@/lib/helpers";
import { Eye, Share, Trash2 } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { Alert } from "./Alert";

function LocationCard({ location }: { location: LocationDetailsWithList }) {

    const { deleteSavedLocation } = usePinBoardStore();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    function handleDeleteClick() {
        setOpen(true);
    }

    function deleteContinueClick(list: LocationDetailsWithList) {
        deleteSavedLocation(list.id);
        toast({
            variant: "destructive",
            description: `Location '${list.name}' deleted.`,
        });
    }

    function getGeoIntent(position: any, label: string): string {
        return position ?
            `geo:${position.lat},${position.lng}?q=${position.lat},${position.lng}(${label})` :
            '';
    }

    return (
        <>
            <Card className="bg-gray-100">
                <CardHeader>
                    <CardTitle>{location.name}</CardTitle>
                    <CardDescription className="flex justify-between">
                        <div>
                            {location.list ?? 'No list'}
                        </div>
                        <div className="flex">
                            {dateInAgoFormat(location.updatedAt)}
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {location.note || 'No note'}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Link to={`/?id=${location.id}`} viewTransition>
                        <Button id="view-button">
                            <Eye />
                            View
                        </Button>
                    </Link>
                    <SaveLocation editLocation={location} />
                    {
                        !isDesktop &&
                        <Link id="share-link" to={getGeoIntent(location.position, location?.name ?? 'Pin Board')} target="_blank">
                            <Button id="share-location-button">
                                <Share />
                                Share
                            </Button>
                        </Link>
                    }
                    <Button id="delete-button" variant="destructive" onClick={handleDeleteClick}><Trash2 />Delete</Button>
                </CardFooter>
            </Card>
            <Alert 
                openAlert={open} 
                setOpenAlert={setOpen} 
                action={() => deleteContinueClick(location)} 
                actionText="Continue" 
                cancelText="Cancel" 
                title="Are you absolutely sure?" 
                description="This action cannot be undone. This will permanently delete your saved location." />
        </>
    );
}

export default LocationCard;