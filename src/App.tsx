import Header from "./components/Header";
import List from "./components/List";
import "./App.css";
import SideBar from "./components/SideBar";

function App() {
  return (
    <div className="w-full h-full flex flex-col rounded-[8px] shadow-md bg-white overflow-hidden">
      <Header />

      <div className="flex h-full relative">
        <SideBar />

        {/* Main content */}
        <div className="flex-1">
          <List />
        </div>
      </div>
    </div>
  );
}

export default App;
