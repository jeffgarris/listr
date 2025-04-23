import { useState, useEffect } from "react";
import Header from "./components/Header";
import List from "./components/List";
import "./App.css";
import ListsMenu from "./components/ListsMenu";
import AddListForm from "./components/AddListForm";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setMenuOpen(false); // Reset on desktop
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-full flex flex-col rounded-[8px] shadow-md bg-white overflow-hidden">
      <Header />

      <div className="flex h-full relative">
        {/* Hamburger Icon */}
        {isMobile && (
          <button
            className="absolute top-2 left-2 z-20 flex flex-col justify-between w-8 h-6 p-1 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="w-full h-[3px] bg-gray-800 rounded"></span>
            <span className="w-full h-[3px] bg-gray-800 rounded"></span>
            <span className="w-full h-[3px] bg-gray-800 rounded"></span>
          </button>
        )}

        {/* Sidebar */}
        <div
          className={`
            flex flex-col 
            border-r border-r-gray-200 bg-white 
            z-10 transition-all duration-300 ease-in-out
            ${
              isMobile
                ? menuOpen
                  ? "absolute top-0 left-0 w-[250px] h-full"
                  : "w-[50px] min-w-[50px] flex-shrink-0"
                : "w-[250px] relative"
            }
          `}
        >
          {(menuOpen || !isMobile) && (
            <>
              <AddListForm />
              <ListsMenu />
            </>
          )}
        </div>

        {/* Main content */}
        <div className="flex-1">
          <List />
        </div>
      </div>
    </div>
  );
}

export default App;
