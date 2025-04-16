import { useListsContext } from "../lib/hooks";
import DeleteButton from "./DeleteButton";

type ListsMenuItemProps = {
  children: React.ReactNode;
  id: string;
};

export default function ListsMenuItem({ children, id }: ListsMenuItemProps) {
  const { handleListsMenuItemSelection, handleDeleteList } = useListsContext();

  return (
    <li
      onClick={() => handleListsMenuItemSelection(id)}
      className={`pl-10 pr-5 py-2 relative text-[#F56A3E] hover:text-[#FF7B50] font-semibold cursor-pointer transition duration-200 ease-in-out flex items-center justify-between`}
    >
      {children}
      <DeleteButton id={id} onClick={() => handleDeleteList(id)} />
    </li>
  );
}
