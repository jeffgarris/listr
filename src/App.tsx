import Header from "./components/Header";
import List from "./components/List";
import "./App.css";
import ListsMenu from "./components/ListsMenu";
import AddListForm from "./components/AddListForm";

function App() {
  return (
    <div className="w-[1000px] h-[700px] flex flex-col rounded-[8px] shadow-md bg-white overflow-hidden">
      <Header />

      <div className="flex h-full">
        <div className="flex flex-col w-[250px] border-r border-r-gray-200">
          <AddListForm />
          <ListsMenu />
        </div>

        <List />
      </div>
    </div>
  );
}

export default App;
