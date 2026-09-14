import "./App.css";
import { SelectConfig, SaveConfig } from "./containers";
import { useModalRoot } from "./components/Modal/hooks/useModalRoot";
import { ProductTypeProvider } from "./context/ProductTypeContext";
import { ELRSConfigsProvider } from "./context/ELRSConfigsContext";

function App() {
  return (
    <ProductTypeProvider>
      <ELRSConfigsProvider>
        <div className="App">
          <SelectConfig />
          <SaveConfig />
        </div>
      </ELRSConfigsProvider>
    </ProductTypeProvider>
  );
}

export default App;
