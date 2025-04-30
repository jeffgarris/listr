import { useState } from "react";
import { useListsContext } from "../lib/hooks";
import Button from "./Button";

export default function AddListForm() {
  const { handleAddList, isMobile } = useListsContext();
  const [listName, setListName] = useState<string>("");
  return (
    <form
      className={`px-5 py-4 ${isMobile ? "mt-[30px]" : ""}`}
      onSubmit={(e) => {
        e.preventDefault();
        if (listName.trim()) {
          handleAddList(listName);
        }
        setListName("");
      }}
    >
      <label className="flex flex-col space-y-4">
        <input
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder="Add a new list"
          className="px-4 py-2 border border-transparent focus:border-[#F56A3E] bg-slate-100 rounded outline-0 transition-colors duration-200 ease-in-out"
        />
        <Button>Add List</Button>
      </label>
    </form>
  );
}
