import { useListsContext } from "../lib/hooks";
import HamburgerIcon from "./HamburgerIcon";

export default function ListHeader() {
  const { lists, selectedListID } = useListsContext();
  return (
    <header className="list-header flex items-center px-5 py-4 text-2xl text-gray-700 font-semibold">
      <HamburgerIcon />

      {/* Display a call to action for the user to add their first list if thereare no lists, otherwise display the name of the selected list. */}
      {lists.length === 0 ? (
        <p className="ml-4 text-[12pt] font-semibold italic text-gray-400">
          <span>←</span> Add your first list!
        </p>
      ) : (
        <h2 className="ml-2 uppercase">
          {lists.find((list) => list.id === selectedListID)?.name} List
        </h2>
      )}
    </header>
  );
}
