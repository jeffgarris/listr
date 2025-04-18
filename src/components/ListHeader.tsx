import { useListsContext } from "../lib/hooks";

export default function ListHeader() {
  const { lists, selectedListID } = useListsContext();
  return (
    <header className="px-5 py-4 text-2xl text-gray-700 font-semibold uppercase">
      {lists.find((list) => list.id === selectedListID)?.name} List
    </header>
  );
}
