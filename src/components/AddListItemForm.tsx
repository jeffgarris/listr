import { useState, useRef, useEffect } from "react";
import { useListsContext } from "../lib/hooks";
import Button from "./Button";

export default function AddListItemForm() {
  const { handleAddItem, setfocusAddItemInput } = useListsContext();
  const [itemText, setItemText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (setfocusAddItemInput) {
      setfocusAddItemInput(() => () => {
        inputRef.current?.focus();
      });
    }
  }, [setfocusAddItemInput]);

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
          ref={inputRef}
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
