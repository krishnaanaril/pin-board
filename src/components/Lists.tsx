import { ListDetailsWithPlaces } from "@/store/model";
import usePinBoardStore from "@/store/pinboard-store";
// import { Button } from "./ui/button";
// import { ArrowLeft } from "lucide-react";
import SaveList from "./SaveList";
import ListCard from "./ListCard";
import PageHeader from "./PageHeader";
// import PageFooter from "./PageFooter";

function Lists() {

  const { savedLists, savedLocations } = usePinBoardStore();

  const listsWithPlaces: ListDetailsWithPlaces[] = savedLists.map(list => ({ ...list, places: savedLocations.filter(location => location.listId === list.id) }));
  const lists = listsWithPlaces.map(list => <ListCard key={list.id} list={list} />);

  // const handleBackClick = () => {
  //   window.history.back();
  // };

  return (
    <div className="block h-full w-screen overflow-y-scroll">
      <PageHeader headerText="Lists">
        <SaveList />
      </PageHeader>
      <div>
        {lists}
        {lists.length === 0 && (
          <div className="flex flex-col justify-center items-center p-4">
            <img className="size-48" src="/public/nodata.svg" alt="No data" />
            <p className="text-center text-xl font-bold my-2">No saved lists found</p>
          </div>
        )}
      </div>
      {/* <PageFooter />
      <div className="fixed w-full bottom-0 py-4 flex place-content-evenly bg-opacity-50 backdrop-blur-lg">
        <Button id="back-button" onClick={handleBackClick} asChild>
          <div>
            <ArrowLeft />
            Back
          </div>
        </Button>
        <SaveList />
      </div> */}
    </div>
  );
}

export default Lists;