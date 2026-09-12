import "./App.css";
import { SelectConfig, SaveConfig } from "./containers";
import { useModalRoot } from "./components/Modal/hooks/useModalRoot";

function App() {
  return (
    <div className="App">
      <SelectConfig />
      <SaveConfig />
    </div>
  );
}

export default App;
