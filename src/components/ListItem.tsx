import { useListsContext } from "../lib/hooks";
import DeleteButton from "./DeleteButton";

type ListItemProps = {
  id: string;
  text: string;
  completed: boolean;
};

export default function ListItem({ id, text, completed }: ListItemProps) {
  const { handleToggleItem, handleDeleteItem } = useListsContext();
  return (
    <li className="flex px-5 py-2 items-center justify-between text-gray-700">
      <span
        onClick={(e) => {
          e.stopPropagation();
          handleToggleItem(id);
        }}
        className={`select-none ${
          completed ? "line-through text-gray-400" : ""
        } cursor-pointer`}
      >
        {text}
      </span>
      <DeleteButton id={id} onClick={handleDeleteItem} />
    </li>
  );
}
