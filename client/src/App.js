import "./App.css";
import Menu from "./components/Menu/Menu";
import RightClickMenu from "./components/RightClickMenu/RightClickMenu";

function App() {
  return (
    <div className="App" onContextMenu={(e) => e.preventDefault()}>
      <Menu name="NestedMenu" />
    </div>
  );
}

export default App;
