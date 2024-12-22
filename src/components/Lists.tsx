import { ListDetailsWithPlaces } from "@/store/model";
import usePinBoardStore from "@/store/pinboard-store";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import SaveList from "./SaveList";

function Lists() {

  const { savedLists, savedLocations } = usePinBoardStore();

  const listsWithPlaces: ListDetailsWithPlaces[] = savedLists.map(list => ({ ...list, places: savedLocations.filter(location => location.listId === list.id) }));
  const lists = listsWithPlaces.map(list => <li key={list.id}>{list.name} <span>{list.places?.length} Places</span> </li>);

  return (
    <>
      <div>
        <h2>Categories</h2>
        <ul>
          {lists}
        </ul>
      </div>
      <div className="fixed w-full bottom-6 flex place-content-evenly">
        <Button asChild>
          <Link to="/">
            <ArrowLeft />
            Back
          </Link>
        </Button>
        <SaveList/>
      </div>
    </>
  );
}

export default Lists;