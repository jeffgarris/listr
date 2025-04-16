import { useState } from "react";
import { useListsContext } from "../lib/hooks";
import Button from "./Button";

export default function AddListItemForm() {
  const { handleAddItem } = useListsContext();
  const [itemText, setItemText] = useState<string>("");
  return (
    <form
      className="px-5 py-4 border-b border-b-gray-200"
      onSubmit={(e) => {
        e.preventDefault();
        handleAddItem(itemText);
        setItemText("");
      }}
    >
      <label className="flex items-center space-x-4">
        <input
          type="text"
          value={itemText}
          onChange={(e) => setItemText(e.target.value)}
          className="px-4 py-2 border border-gray-400 rounded outline-0"
        />
        <Button>Add Item</Button>
      </label>
    </form>
  );
}
