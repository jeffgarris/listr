import { useContext } from "react";
import { ListsContext } from "../contexts/ListsContextProvider";

export function useListsContext() {
  const context = useContext(ListsContext);
  if (!context) {
    throw new Error("useListsContext must be used within a ListsProvider");
  }
  return context;
}
