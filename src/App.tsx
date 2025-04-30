import { useListsContext } from "./lib/hooks";
import Header from "./components/Header";
import List from "./components/List";
import "./App.css";
import SideBar from "./components/SideBar";

function App() {
  const { setMenuOpen } = useListsContext();
  return (
    <div
      onClick={() => setMenuOpen(false)}
      className="w-full h-full flex flex-col rounded-[8px] bg-white overflow-hidden"
    >
      <Header />

      <div className="flex h-full relative">
        <SideBar />

        <div className="flex-1">
          <List />
        </div>
      </div>
    </div>
  );
}

export default App;
