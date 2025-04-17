import { useListsContext } from "../lib/hooks";
import ListItem from "./ListItem";

export default function ListItems() {
  const { lists, selectedListID } = useListsContext();
  return (
    <ul className="overflow-y-auto h-[488px]">
      {lists.find((list) => list.id === selectedListID)?.items.length === 0 ? (
        <p className="flex items-center justify-center mt-4 font-semibold italic text-gray-400">
          No items in this list. Add some items to get started!
        </p>
      ) : (
        lists
          .find((list) => list.id === selectedListID)
          ?.items.map((item) => (
            <ListItem
              key={item.id}
              id={item.id}
              text={item.text}
              completed={item.completed}
            />
          ))
      )}
    </ul>
  );
}
