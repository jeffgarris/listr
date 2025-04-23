import { useListsContext } from "../lib/hooks";
import HamburgerIcon from "./HamburgerIcon";

export default function ListHeader() {
  const { lists, selectedListID } = useListsContext();
  return (
    <header className="flex items-center px-5 py-4 text-2xl text-gray-700 font-semibold uppercase">
      <HamburgerIcon />
      <h2 className="ml-2">
        {lists.find((list) => list.id === selectedListID)?.name} List
      </h2>
    </header>
  );
}
