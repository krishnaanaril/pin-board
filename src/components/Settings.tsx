import usePinBoardStore from "@/store/pinboard-store";
import PageHeader from "./PageHeader";
import { Button } from "./ui/button";
import { SaveData } from "@/lib/helpers";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import { ModeToggle } from "./ModeToggle";
import { FileDown } from "lucide-react";

function Settings() {

    const { savedLists, savedLocations, appendSavedLists, appendSavedLocations } = usePinBoardStore();
    const { toast } = useToast();


    function exportData() {
        const data = {
            lists: savedLists,
            locations: savedLocations
        };
        const serializedData = JSON.stringify(data, null, 2);
        SaveData('pin-board-data.json', serializedData);
    }

    function importData() {
        const fileInput = document.getElementById('file-input') as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target?.result;
                if (typeof data === 'string') {
                    const parsedData = JSON.parse(data);
                    const filteredLists = parsedData.lists.filter((list: any) =>
                        !savedLists.some((savedList: any) => savedList.id === list.id)
                    );
                    const filteredLocations = parsedData.locations.filter((location: any) =>
                        !savedLocations.some((savedLocation: any) => savedLocation.id === location.id)
                    );
                    let message = '';
                    if (filteredLists.length > 0 || filteredLocations.length > 0) {
                        message += `Lists: ${filteredLists.length} and Locations: ${filteredLocations.length} imported. `;
                    }
                    else {
                        message += `No new data to import.`;
                    }
                    appendSavedLists(filteredLists);
                    appendSavedLocations(filteredLocations);
                    toast({
                        description: message,
                    });
                }
            }
            reader.readAsText(file);
        }
    }

    return (
        <div className="block h-full">
            <PageHeader headerText="Settings" />
            <Card>
                <CardHeader>
                    <CardTitle>Dark Mode</CardTitle>
                </CardHeader>
                <CardContent>
                    <ModeToggle />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Export Data</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button onClick={exportData} >
                        <FileDown />
                        <span>Export</span>
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Import Data</CardTitle>
                </CardHeader>
                <CardContent>
                    <Input className="my-4" id="file-input" type="file" placeholder="Upload json file" />
                    <Button onClick={importData} >Import</Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default Settings;