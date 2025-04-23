import { useListsContext } from "../lib/hooks";
import AddListItemForm from "./AddListItemForm";
import ListHeader from "./ListHeader";
import ListItems from "./ListItems";

export default function List() {
  const { lists } = useListsContext();
  return (
    <>
      {lists.length === 0 ? (
        <p className="mt-6 ml-4 font-semibold italic text-gray-400">
          <span>←</span> Add your first list!
        </p>
      ) : (
        <>
          <ListHeader />
          <AddListItemForm />
        </>
      )}

      <ListItems />
    </>
  );
}
