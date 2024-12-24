import { ListDetailsWithPlaces } from "@/store/model";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import usePinBoardStore from "@/store/pinboard-store";
import SaveList from "./SaveList";
import { Button } from "./ui/button";
import { Link } from "react-router";
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

function ListCard({ list }: { list: ListDetailsWithPlaces }) {

    const { deleteListItem, savedLocations } = usePinBoardStore();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    function handleDeleteClick() {
        const isListUsed = savedLocations.some(location => location.listId === list.id);
        if (isListUsed) {
            setOpen2(true);
            return;
        }
        setOpen(true);
    }

    function deleteOkayClick() {
        setOpen2(false);
    }

    function deleteContinueClick(list: ListDetailsWithPlaces) {
        deleteListItem(list.id);
        toast({
            variant: "destructive",
            description: `List '${list.name}' deleted.`,
        });
        setOpen(false);
    }

    return (
        <>
            <Card className="m-4">
                <CardHeader>
                    <CardTitle>{list.name}</CardTitle>
                    <CardDescription>{list.places?.length} Places</CardDescription>
                </CardHeader>
                <CardContent>
                    {list.description || 'No description'}
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button id="view-button">
                        <Link to={`/saved?listId=${list.id}`}>
                            View
                        </Link>
                    </Button>
                    <SaveList editList={list} />
                    <Button id="delete-button" onClick={handleDeleteClick}>Delete</Button>
                </CardFooter>
            </Card>            
            <AlertDialog open={open2} onOpenChange={setOpen2}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>You won't be able to proceed!</AlertDialogTitle>
                        <AlertDialogDescription>
                            This list is being used by some locations. Please remove the list from those locations before deleting.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={deleteOkayClick}>Okay</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            list.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteContinueClick(list)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
export default ListCard;