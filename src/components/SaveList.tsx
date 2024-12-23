import { ListDetails } from "@/store/model";
import { useState } from "react";
import { Button } from "./ui/button";
import { ListPlus } from "lucide-react";
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
import { SaveListForm } from "./SaveListForm";
import { useMediaQuery } from 'usehooks-ts'

function SaveList({ editList }: { editList?: ListDetails }) {

    const [open, setOpen] = useState(false);
    const action: 'Edit' | 'Add' = editList ? 'Edit' : 'Add';
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button id={`${action.toLowerCase()}-list-button`}>
                        <ListPlus />
                        {action}
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="px-4">{action} List</DialogTitle>
                        <DialogDescription className="px-4">
                        {action} list by entering a name and description.
                        </DialogDescription>
                    </DialogHeader>
                    <SaveListForm editList={editList} setOpen={setOpen} />
                </DialogContent>
            </Dialog>
        )
    } else {
        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button id={`${action.toLowerCase()}-list-button`}>
                        <ListPlus />
                        {action}
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{action} List</DrawerTitle>
                        <DrawerDescription>
                            {action} list by entering a name and description.
                        </DrawerDescription>
                    </DrawerHeader>
                    <SaveListForm editList={editList} setOpen={setOpen} />
                    <DrawerFooter className="pt-2">
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );
    }

};

export default SaveList;