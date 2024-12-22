import { ListDetailsWithPlaces } from "@/store/model";
import usePinBoardStore from "@/store/pinboard-store";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import SaveList from "./SaveList";
import ListCard from "./ListCard";
import PageHeader from "./PageHeader";

function Lists() {

  const { savedLists, savedLocations } = usePinBoardStore();

  const listsWithPlaces: ListDetailsWithPlaces[] = savedLists.map(list => ({ ...list, places: savedLocations.filter(location => location.listId === list.id) }));
  const lists = listsWithPlaces.map(list => <ListCard key={list.id} list={list} />);

  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <>
      <div>
        <PageHeader headerText="Lists" />
        <ul>
          {lists}
        </ul>
      </div>
      <div className="fixed w-full bottom-0 py-4 flex place-content-evenly bg-opacity-50 backdrop-blur-lg">
        <Button onClick={handleBackClick} asChild>
          <div>
            <ArrowLeft />
            Back
          </div>
        </Button>
        <SaveList />
      </div>
    </>
  );
}

export default Lists;