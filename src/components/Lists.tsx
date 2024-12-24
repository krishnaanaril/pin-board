import { ListDetailsWithPlaces } from "@/store/model";
import usePinBoardStore from "@/store/pinboard-store";
import SaveList from "./SaveList";
import ListCard from "./ListCard";
import PageHeader from "./PageHeader";

function Lists() {

  const { savedLists, savedLocations } = usePinBoardStore();

  const listsWithPlaces: ListDetailsWithPlaces[] = savedLists.map(list => ({ ...list, places: savedLocations.filter(location => location.listId === list.id) }));
  const lists = listsWithPlaces.map(list => <ListCard key={list.id} list={list} />);

  return (
    <div className="block h-full w-full">
      <PageHeader headerText="Lists">
        <SaveList />
      </PageHeader>
      <div className="h-3/4 flex flex-col justify-center">
        {lists}
        {lists.length === 0 && (
          <div className="flex flex-col justify-center items-center p-4">
            <img className="size-48" src="/nodata.svg" alt="No data" />
            <p className="text-center font-bold my-2">No saved lists found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Lists;