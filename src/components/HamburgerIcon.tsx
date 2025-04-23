import { useListsContext } from "../lib/hooks";

type HamburgerIconProps = {
  container?: "sidebar";
};

export default function HamburgerIcon({ container }: HamburgerIconProps) {
  const { isMobile, menuOpen, setMenuOpen } = useListsContext();
  return (
    isMobile && (
      <button
        className={`${
          container === "sidebar" ? "relative top-[20px] left-[20px]" : ""
        } flex flex-col justify-between w-8 h-6 p-1 focus:outline-none cursor-pointer`}
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpen(!menuOpen);
        }}
      >
        <span className="w-full h-[3px] bg-gray-800 rounded"></span>
        <span className="w-full h-[3px] bg-gray-800 rounded"></span>
        <span className="w-full h-[3px] bg-gray-800 rounded"></span>
      </button>
    )
  );
}
