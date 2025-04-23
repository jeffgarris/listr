import { createContext, useState, useEffect } from "react";
import CapitalizeFirstLetter from "../lib/utils";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useModal } from "../contexts/ModalContext";

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
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  isMobile: boolean;
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
  // ----- State ----- //
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [lists, setLists] = useState<Lists>(getInitialLists);
  const [selectedListID, setSelectedListID] = useState("");
  const [pendingURLUpdateListID, setPendingURLUpdateListID] = useState<
    string | null
  >(null);
  const [focusAddItemInput, setfocusAddItemInput] = useState<() => void>(
    () => () => {}
  );

  // ----- Contexts ----- //
  const { showModal } = useModal();

  // ----- Variables ----- //
  const maxUnauthedLists = 3; // Maximum number of lists for unauthenticated users
  const maxUnauthedListItems = 5; // Maximum number of list items for unauthenticated users
  const { login, isAuthenticated } = useKindeAuth();

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
    if (isMobile) {
      setMenuOpen(false); // Close the menu on mobile when a list is selected
    }
    focusAddItemInput?.();
  };

  // Add a list
  const handleAddList = (listName: string) => {
    if (lists.length >= maxUnauthedLists && !isAuthenticated) {
      showModal({
        title: "List Limit Reached",
        content:
          "You’ve reached the maximum number of free lists. Please log in to add more.",
        buttonPrimary: "Log In",
        onPrimaryClick: () => login(),
        buttonSecondary: "Cancel",
      });
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
      if (isMobile) {
        setMenuOpen(false); // Close the menu on mobile when a list is selected
      }
      focusAddItemInput?.(); // Focus the Add Item input field
    }
  };

  // Add an item to a list
  const handleAddItem = (itemText: string) => {
    if (
      lists.filter((list) => list.id === selectedListID)[0].items.length >=
        maxUnauthedListItems &&
      !isAuthenticated
    ) {
      showModal({
        title: "List Item Limit Reached",
        content:
          "You’ve reached the maximum number of free items. Please log in to add more.",
        buttonPrimary: "Log In",
        onPrimaryClick: () => login(),
        buttonSecondary: "Cancel",
      });
      return;
    }
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

  const confirmDeleteList = (id: string) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== id));
    setSelectedListID("");
    if (selectedListID === id) {
      setSelectedListID(lists[0].id); // Clear selected list if the deleted list is currently selected
      updateURLListParam(lists[0].id); // Update URL to the first list if the deleted list is currently selected
    }
  };

  // Delete a list
  const handleDeleteList = (id: string) => {
    showModal({
      title: "Delete List?",
      content:
        "Are you sure you want to delete this list? This action cannot be undone.",
      buttonPrimary: "Delete",
      onPrimaryClick: () => confirmDeleteList(id),
      buttonSecondary: "Cancel",
    });
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

  // Handle window resizing
  useEffect(() => {
    console.log("resizing");
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setMenuOpen(false); // Reset on desktop
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        menuOpen,
        setMenuOpen,
        isMobile,
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
