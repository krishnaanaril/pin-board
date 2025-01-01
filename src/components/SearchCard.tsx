import { LocationSearchResult } from "@/store/model";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import usePinBoardStore from "@/store/pinboard-store";

export function SearchCard({ list }: { list: LocationSearchResult }) {

    const { updateActivePosition } = usePinBoardStore();
    const navigate = useNavigate();

    function handleViewClick(list: LocationSearchResult) {
        console.log(list);
        updateActivePosition({ lat: parseFloat(list.lat), lng: parseFloat(list.lon), text: list.display_name });
        navigate('/');
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{list.name}</CardTitle>
                <CardDescription>{list.display_name}</CardDescription>
            </CardHeader>
            {/* <CardContent>
                {list.description}
            </CardContent> */}
            <CardFooter className="flex justify-between">
                {/* <Button id="view-button">
                    <Link to={`/saved?listId=${list.id}`}>
                        View
                    </Link>
                </Button> */}
                {/* <SaveList editList={list} /> */}
                <Button id="delete-button" onClick={() => handleViewClick(list)}>View</Button>
            </CardFooter>
        </Card>
    );
}