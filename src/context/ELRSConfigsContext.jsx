import { createContext, useReducer, useContext } from "react";

const ELRSConfigsContext = createContext();
const ELRSConfigsDispatcherContext = createContext();

const initialConfigs = [];

function configsReducer(configs, action) {
  switch (action.type) {
    case "init": {
      return action.configs;
    }
    case "added": {
      return [...configs, action.config];
    }
    case "changed": {
      return configs.map((c) => {
        if (c.id === action.config.id) {
          return action.config;
        } else {
          return c;
        }
      });
    }
    case "deleted": {
      return configs.filter((c) => c.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export const ELRSConfigsProvider = ({ children }) => {
  const [configs, dispatch] = useReducer(configsReducer, initialConfigs);

  return (
    <ELRSConfigsContext.Provider value={configs}>
      <ELRSConfigsDispatcherContext.Provider value={dispatch}>
        {children}
      </ELRSConfigsDispatcherContext.Provider>
    </ELRSConfigsContext.Provider>
  );
};

export const useELRSConfigsContext = () => useContext(ELRSConfigsContext);
export const useELRSConfigsDispatcherContext = () => useContext(ELRSConfigsDispatcherContext);
