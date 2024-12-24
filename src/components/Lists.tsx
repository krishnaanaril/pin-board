import { ListDetailsWithPlaces } from "@/store/model";
import usePinBoardStore from "@/store/pinboard-store";
import SaveList from "./SaveList";
import ListCard from "./ListCard";
import PageHeader from "./PageHeader";
import { EmptyMessage } from "./EmptyMessage";

function Lists() {

  const { savedLists, savedLocations } = usePinBoardStore();

  const listsWithPlaces: ListDetailsWithPlaces[] = savedLists.map(list => ({ ...list, places: savedLocations.filter(location => location.listId === list.id) }));
  const lists = listsWithPlaces.map(list => <ListCard key={list.id} list={list} />);

  return (
    <div className="block h-full w-full">
      <PageHeader headerText="Lists">
        <SaveList />
      </PageHeader>
      {lists}
      {
        lists.length === 0 &&
        <EmptyMessage message="No saved lists found" />
      }
    </div>
  );
}

export default Lists;