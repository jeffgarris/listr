import { useState, useRef, useEffect } from "react";
import { useListsContext } from "../lib/hooks";
import Button from "./Button";

export default function AddListItemForm() {
  const { handleAddItem, setfocusAddItemInput, isMobile } = useListsContext();
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
        if (itemText.trim()) {
          handleAddItem(itemText);
        }
        setItemText("");
      }}
    >
      <label
        className={`flex ${isMobile ? "flex-col space-y-4" : "space-x-4"}`}
      >
        <input
          ref={inputRef}
          type="text"
          value={itemText}
          onChange={(e) => setItemText(e.target.value)}
          placeholder="Add a new item"
          className="flex-1 px-4 py-2 border border-transparent focus:border-[#F56A3E] empty:text-gray-500 bg-slate-100 rounded outline-0 transition-colors duration-200 ease-in-out"
        />
        <Button>Add Item</Button>
      </label>
    </form>
  );
}
