import { Button } from "./ui/button";
import { MapPinPlus } from "lucide-react";
import { LocationDetails } from "@/store/model";
import { useState } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { SaveLocationForm } from "./SaveLocationForm";
import { useMediaQuery } from "usehooks-ts";

function SaveLocation({ editLocation }: { editLocation?: LocationDetails }) {

    const [open, setOpen] = useState(false);
    const action: 'Edit' | 'Add' = editLocation ? 'Edit' : 'Add';
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button id={`${action.toLowerCase()}-list-button`}>
                        <MapPinPlus />
                        {action}
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="px-4">{action} Location</DialogTitle>
                        <DialogDescription className="px-4">
                            {action} the selected location by entering a name and note.
                        </DialogDescription>
                    </DialogHeader>
                    <SaveLocationForm editLocation={editLocation} setOpen={setOpen} />
                </DialogContent>
            </Dialog>
        )
    } else {
        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button id={`${action.toLowerCase()}-location-button`}>
                        <MapPinPlus />
                        {action}
                    </Button>
                </DrawerTrigger >
                <DrawerContent>
                    <DrawerHeader >
                        <DrawerTitle>{action} Location</DrawerTitle>
                        <DrawerDescription>
                            {action} the selected location by entering a name and note.
                        </DrawerDescription>
                    </DrawerHeader >
                    <SaveLocationForm editLocation={editLocation} setOpen={setOpen} />
                    <DrawerFooter className="pt-2">
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>

                </DrawerContent>
            </Drawer>
        );
    }
}

export default SaveLocation;