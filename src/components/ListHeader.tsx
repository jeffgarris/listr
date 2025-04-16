import { useListsContext } from "../lib/hooks";

export default function ListHeader() {
  const { lists, selectedListID } = useListsContext();
  return (
    <header className="px-5 py-4 text-2xl font-semibold uppercase">
      {lists.find((list) => list.id === selectedListID)?.name}
    </header>
  );
}
