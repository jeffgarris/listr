import { useState } from "react";
import { useListsContext } from "../lib/hooks";
import Button from "./Button";

export default function AddListForm() {
  const { handleAddList } = useListsContext();
  const [listName, setListName] = useState<string>("");
  return (
    <form
      className="px-5 py-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleAddList(listName);
        setListName("");
      }}
    >
      <label className="flex flex-col space-y-4">
        <input
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          className="px-4 py-2 border border-gray-400 rounded outline-0"
        />
        <Button>Add List</Button>
      </label>
    </form>
  );
}
