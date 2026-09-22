import defaultConfig from "../configs/default";

// props for which don't exist a field in the form, but still need to be handled
let virtualProps = {};

const getForm = () => document.querySelector("#upload_options");

export const applyConfigToForm = (selectedConfig) => {
  const form = getForm();

  for (const prop in selectedConfig.configuration) {
    const input = form.querySelector(`[name='${prop}']`);

    if (input) {
      input.value = selectedConfig.configuration[prop];
    } else {
      virtualProps[prop] = selectedConfig.configuration[prop];
    }
  }
};

const castTypes = (value) => {
  switch (value) {
    case "true":
    case "on":
      return true;
    case "false":
    case "off":
      return false;
    default:
      if (value !== "" && !isNaN(value)) {
        return Number(value);
      }
      return value;
  }

  return value;
};

const castTypesHandlers = {
  "wifi-on-interval": (value) => {
    if (isNaN(value) || Number(value) === 0) return -1;

    return Number(value);
  },
  "unlock-higher-power": () => true,
};

const castTypesMap = new Proxy(castTypesHandlers, {
  get(target, prop) {
    // if the property has a specific cast handler, use it
    if (prop in target) {
      return target[prop];
    }

    return (value, productType) => {
      let typedValue = castTypes(value);
      const defaultTypedValue = defaultConfig[productType]?.[prop];

      // if the typed value is different from the default config, return it
      if (defaultTypedValue !== undefined && defaultTypedValue !== typedValue) {
        return typedValue;
      }

      // otherwise, return null to indicate no meaningful value
      return null;
    };
  },
});

export const takeFormValues = (productType) => {
  const form = getForm();
  const formData = new FormData(form);
  const values = {};

  for (const [key, value] of formData.entries()) {
    const typedValue = castTypesMap[key](value, productType);

    if (typedValue) {
      values[key] = typedValue;
    }
  }

  const allValues = { ...values, ...virtualProps };

  virtualProps = {};

  return allValues;
};
