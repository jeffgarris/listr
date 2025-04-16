import { useListsContext } from "../lib/hooks";
import ListsMenuItem from "./ListsMenuItem";

export default function ListsMenu() {
  const { lists, selectedListID } = useListsContext();

  return (
    <ul className="h-full pt-4">
      {lists.map((list) => (
        <ListsMenuItem key={list.id} id={list.id}>
          {selectedListID === list.id ? (
            <span className="absolute left-4 w-1 h-2/3 bg-[#F56A3E]"></span>
          ) : null}
          {list.name}
        </ListsMenuItem>
      ))}
    </ul>
  );
}
