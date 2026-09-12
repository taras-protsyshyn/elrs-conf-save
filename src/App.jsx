import "./App.css";
import { SelectConfig, SaveConfig } from "./containers";
import { useModalRoot } from "./components/Modal/hooks/useModalRoot";
import { ProductTypeProvider } from "./context/ProductTypeContext";

function App() {
  return (
    <ProductTypeProvider>
      <div className="App">
        <SelectConfig />
        <SaveConfig />
      </div>
    </ProductTypeProvider>
  );
}

export default App;
