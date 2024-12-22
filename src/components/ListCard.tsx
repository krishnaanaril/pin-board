import { ListDetailsWithPlaces } from "@/store/model";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import usePinBoardStore from "@/store/pinboard-store";
import SaveList from "./SaveList";
import { Button } from "./ui/button";
import { Link } from "react-router";

function ListCard({ list }: { list: ListDetailsWithPlaces }) {

    const { deleteListItem } = usePinBoardStore();
    return (
        <Card>
            <CardHeader>
                <CardTitle>{list.name}</CardTitle>
                <CardDescription>{list.places?.length} Places</CardDescription>
            </CardHeader>
            <CardContent>
                {list.description}
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button>
                    <Link to={`/saved?listId=${list.id}`}>
                        View
                    </Link>
                </Button>
                <SaveList editList={list} />
                <Button onClick={() => deleteListItem(list.id)}>Delete</Button>
            </CardFooter>
        </Card>
    );
}
export default ListCard;