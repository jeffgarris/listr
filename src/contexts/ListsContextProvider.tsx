import { createContext, useState } from "react";
import CapitalizeFirstLetter from "../lib/utils";
import { useEffect } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

type ListItem = {
  id: string;
  text: string;
  completed: boolean;
};

type List = {
  id: string;
  name: string;
  items: ListItem[];
};

type Lists = List[];

type TListsContext = {
  lists: Lists;
  selectedListID: string;
  handleListsMenuItemSelection: (id: string) => void;
  handleAddList: (listName: string) => void;
  handleAddItem: (listItem: string) => void;
  handleToggleItem: (id: string) => void;
  handleDeleteList: (id: string) => void;
  handleDeleteItem: (id: string) => void;
  focusAddItemInput?: () => void;
  setfocusAddItemInput?: (fn: () => void) => void;
};

export const ListsContext = createContext<TListsContext | null>(null);

// Get initial lists from local storage or return an empty array
const getInitialLists = () => {
  const storedLists = localStorage.getItem("lists");
  if (storedLists) {
    return JSON.parse(storedLists);
  } else {
    return [];
  }
};

type ListsContextProviderProps = {
  children: React.ReactNode;
};

export default function ListsContextProvider({
  children,
}: ListsContextProviderProps) {
  const [lists, setLists] = useState<Lists>(getInitialLists);
  const [selectedListID, setSelectedListID] = useState("");
  const [pendingURLUpdateListID, setPendingURLUpdateListID] = useState<
    string | null
  >(null);
  const [focusAddItemInput, setfocusAddItemInput] = useState<() => void>(
    () => () => {}
  );
  const maxUnauthedLists = 3; // Maximum number of lists for unauthenticated users
  const { isAuthenticated } = useKindeAuth();

  // Update the URL "list" param when a list is added or selected from the mmenu
  const updateURLListParam = (id: string) => {
    const selectedList = lists.find((list) => list.id === id);
    if (selectedList) {
      const url = new URL(window.location.href);
      url.searchParams.set("list", selectedList.name);
      window.history.pushState({}, "", url.toString());
    }
    setSelectedListID(id);
  };

  // Remove URL params if all lists have been removed
  const removeListQueryParam = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("list"); // remove the list param
    window.history.pushState({}, "", url.toString()); // update the URL without a page reload
  };

  // ----- Event handlers / actions ----- //

  // Get the value of the "list" URL parameter
  const getURLListParam = () => {
    const url = new URL(window.location.href);
    const listParam = url.searchParams.get("list");
    if (listParam) {
      return listParam;
    }
  };

  const handleListsMenuItemSelection = (id: string) => {
    setSelectedListID(id);
    updateURLListParam(id);
    focusAddItemInput?.();
  };

  // Add a list
  const handleAddList = (listName: string) => {
    if (lists.length >= maxUnauthedLists && !isAuthenticated) {
      alert(
        "You have reached the maximum number of lists. Please log in to add more."
      );
      return;
    } else {
      const id = crypto.randomUUID();
      setLists((prevLists) => [
        ...prevLists,
        {
          id: id,
          name: CapitalizeFirstLetter(listName.trim()),
          items: [],
        },
      ]);
      setPendingURLUpdateListID(id);
      focusAddItemInput?.(); // Focus the Add Item input field
    }
  };

  // Add an item to a list
  const handleAddItem = (itemText: string) => {
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === selectedListID) {
          return {
            ...list,
            items: [
              ...list.items,
              {
                id: crypto.randomUUID(),
                text: CapitalizeFirstLetter(itemText.trim()),
                completed: false,
              },
            ],
          };
        }
        return list;
      })
    );
  };

  // Toggle the completed state of a list item
  const handleToggleItem = (id: string) => {
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === selectedListID) {
          return {
            ...list,
            items: list.items.map((item) =>
              item.id === id ? { ...item, completed: !item.completed } : item
            ),
          };
        }
        return list;
      })
    );
  };

  // Delete a list
  const handleDeleteList = (id: string) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== id));
    setSelectedListID("");
    if (selectedListID === id) {
      setSelectedListID(lists[0].id); // Clear selected list if the deleted list is currently selected
      updateURLListParam(lists[0].id); // Update URL to the first list if the deleted list is currently selected
    }
  };

  // Delete a list item
  const handleDeleteItem = (id: string) => {
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === selectedListID) {
          return {
            ...list,
            items: list.items.filter((item) => item.id !== id),
          };
        }
        return list;
      })
    );
  };

  // ----- Side effects ----- //

  // Get lists from local storage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  // Add new list - Update URL "list" param
  useEffect(() => {
    if (pendingURLUpdateListID) {
      updateURLListParam(pendingURLUpdateListID);
      setPendingURLUpdateListID(null); // clear after updating
    }
  }, [lists]);

  // Remove URL "list" param if all lists are deleted
  useEffect(() => {
    const listParam = getURLListParam();

    if (listParam && lists.length === 0) {
      removeListQueryParam();
    }
  }, [lists]);

  useEffect(() => {
    const listParam = getURLListParam();

    if (!listParam && lists.length > 0) {
      setSelectedListID(lists[0].id); // Set to the first list if no list is set in URL
      updateURLListParam(lists[0].id); // Update URL to the first list if no list is set in URL
    } else if (listParam && lists.length > 0) {
      if (listParam) {
        const matchingList = lists.find((list) => list.name === listParam);
        // If the "list" param matches an existing list name, set that list as the selected list
        if (matchingList) {
          setSelectedListID(matchingList.id);
        } else {
          setSelectedListID(lists[0]?.id); // Set to the first list if no list is set in URL
          updateURLListParam(lists[0].id); // Update URL to the first list if no list is set in URL
        }
      }
    }
  }, [lists]);

  return (
    <ListsContext.Provider
      value={{
        lists,
        selectedListID,
        handleListsMenuItemSelection,
        handleAddList,
        handleAddItem,
        handleToggleItem,
        handleDeleteList,
        handleDeleteItem,
        focusAddItemInput,
        setfocusAddItemInput,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
}
