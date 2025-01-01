import { LocationSearchResult } from "@/store/model";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import usePinBoardStore from "@/store/pinboard-store";
import { truncate } from "fs";

export function SearchCard({ list }: { list: LocationSearchResult }) {

    const { updateActivePosition } = usePinBoardStore();
    const navigate = useNavigate();

    function handleViewClick(list: LocationSearchResult) {        
        updateActivePosition({ lat: parseFloat(list.lat), lng: parseFloat(list.lon), text: list.display_name });
        navigate('/', {viewTransition: true});
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{list.name}</CardTitle>
                <CardDescription>{list.display_name}</CardDescription>
            </CardHeader>            
            <CardFooter className="flex justify-between">                
                <Button id="delete-button" onClick={() => handleViewClick(list)}>View</Button>
            </CardFooter>
        </Card>
    );
}