import { useListsContext } from "../lib/hooks";
import ListsMenu from "./ListsMenu";
import AddListForm from "./AddListForm";
import HamburgerIcon from "./HamburgerIcon";

export default function SideBar() {
  const { isMobile, menuOpen } = useListsContext();
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`
            h-full border-r border-r-gray-200 bg-white transition-all duration-300 ease-in-out
            ${
              isMobile
                ? menuOpen
                  ? "absolute top-0 left-[0] w-[250px]"
                  : "absolute top-0 left-[-250px] w-[250px]"
                : "flex flex-col w-[250px]"
            }
          `}
    >
      <HamburgerIcon container="sidebar" />
      <>
        <AddListForm />
        <ListsMenu />
      </>
    </div>
  );
}
