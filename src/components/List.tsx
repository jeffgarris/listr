import { useListsContext } from "../lib/hooks";
import AddListItemForm from "./AddListItemForm";
import ListHeader from "./ListHeader";
import ListItems from "./ListItems";

export default function List() {
  const { lists } = useListsContext();
  return (
    <>
      <ListHeader />
      {lists.length > 0 && <AddListItemForm />}
      <ListItems />
    </>
  );
}
