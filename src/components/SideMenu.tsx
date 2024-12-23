import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

function SideMenu() {
    return (
        <Sheet>
            <SheetTrigger className="flex flex-col items-center">
                <Menu />
                Menu
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                    Version 1.0.0
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default SideMenu;