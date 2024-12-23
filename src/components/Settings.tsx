import usePinBoardStore from "@/store/pinboard-store";
import PageHeader from "./PageHeader";
import { Button } from "./ui/button";
import { SaveData } from "@/lib/helpers";
import { Input } from "./ui/input";

function Settings() {
    
    const { savedLists, savedLocations, appendSavedLists, appendSavedLocations } = usePinBoardStore();

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
                    appendSavedLists(parsedData.lists);
                    appendSavedLocations(parsedData.locations);
                }
            }
            reader.readAsText(file);
        }
    }

    return (
        <div className="block h-full w-screen overflow-y-scroll">
            <PageHeader headerText="Settings" />
            <div className="p-4">
                <h2 className="text-2xl font-bold underline underline-offset-1">Export Data</h2>
                <Button onClick={exportData} >Export</Button>
            </div>
            <div className="p-4">
                <h2 className="text-2xl font-bold underline underline-offset-1">Import Data</h2>
                <Input id="file-input" type="file" placeholder="Upload json file"/>
                <Button onClick={importData} >Import</Button>
            </div>
        </div>
    )
}

export default Settings;