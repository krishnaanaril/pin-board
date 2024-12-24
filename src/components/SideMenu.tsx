import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Bookmark, Info, List, Menu, Search, Settings } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

function SideMenu() {

    let navigate = useNavigate();
    const [open, setOpen] = useState(false);

    function linkClick(path: string) {
        navigate(path);
        setOpen(false);
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="flex flex-col items-center">
                <Menu />
                Menu
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-2xl">Pin Board</SheetTitle>
                    <SheetDescription>                        
                            <span>
                                PinBoard is an application that helps users save locations from a map and share them with other map applications on their device.
                            </span>
                            <strong className="block my-4">Version: 1.0.0</strong>                        
                    </SheetDescription>
                </SheetHeader>
                <ul className="my-4">
                    <li onClick={() => linkClick('/saved')} className="flex flex-row my-6 font-bold">
                        <Bookmark />
                        <span className="px-4">Saved</span>
                    </li>
                    <li onClick={() => linkClick('/')} className="flex flex-row my-6 font-bold">
                        <Search />
                        <span className="px-4">Search</span>
                    </li>
                    <li onClick={() => linkClick('/lists')} className="flex flex-row my-6 font-bold">
                        <List />
                        <span className="px-4">Lists</span>
                    </li>
                    <li onClick={() => linkClick('/settings')} className="flex flex-row my-6 font-bold">
                        <Settings />
                        <span className="px-4">Settings</span>
                    </li>
                    <li onClick={() => linkClick('/about')} className="flex flex-row my-6 font-bold">
                        <Info />
                        <span className="px-4">About</span>
                    </li>
                </ul>
            </SheetContent>
            
        </Sheet>
    );
}

export default SideMenu;