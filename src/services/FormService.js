const defaultConfig = {
  "wifi-on-interval": 60,
  "tlm-interval": 240,
  "fan-runtime": 30,
  "unlock-higher-power": true,
  "airport-uart-baud": 460800,
  "is-airport": false,
  domain: 1,
  "uart-inverted": false,
  customised: true,
  custom_freq: "0,0,0",
  custom_freq2: "0,0,0,0",
  encryption_key: "",
  binding_key: "",
  vx_control: "0,0,0,0,0,0,0,0,0",
  vx_control2: "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
  vtx_power: "0,0,0,0,0,0,0",
  vx_presets:
    "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
  vx_bands: "A,B,E,F,R,L,X,Y",
  vx_filter: "0,1,10",
  vx_table: "",
  custom_crsf_baud: "-400000,420000,0",
  auto_tune: "0,0,0,0,0",
  tx_id: "",
  tx_lock: "",
  ew_scanner: "0,0,0",
  multi_band: "0,0,0,0",
  retrans: "0,0,0,0,0,0,0",
  tx_power: "0,0,0,0,0,0,0",
  brand: "",
  relay: "0,0,0,0,0,0",
  fast_switch: "0,0,0,0,0,0,0,0",
  lang: 0,
  allow_msp: 0,
  alt_keys: "0,0,0",
  retr_stats: 0,
};

const getForm = () => document.querySelector("#upload_options");

export const applyConfigToForm = (selectedConfig) => {
  const form = getForm();

  for (const prop in selectedConfig.configuration) {
    const input = form.querySelector(`[name='${prop}']`);

    if (input) {
      input.value = selectedConfig.configuration[prop];
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
  // return this values as it is, just cast string to boolean or number
  "unlock-higher-power": (value) => castTypes(value),
  domain: (value) => castTypes(value),
  "uart-inverted": (value) => castTypes(value),
};

const castTypesMap = new Proxy(castTypesHandlers, {
  get(target, prop) {
    // if the property has a specific cast handler, use it
    if (prop in target) {
      return target[prop];
    }

    // otherwise, use the default castTypes function
    return (value) => {
      let typedValue = castTypes(value);

      // if the typed value is different from the default config, return it
      if (defaultConfig[prop] !== undefined && defaultConfig[prop] !== typedValue) {
        return typedValue;
      }

      // otherwise, return null to indicate no meaningful value
      return null;
    };
  },
});

export const takeFormValues = () => {
  const form = getForm();
  const formData = new FormData(form);
  const values = {};

  for (const [key, value] of formData.entries()) {
    const typedValue = castTypesMap[key](value);

    if (typedValue) {
      values[key] = typedValue;
    }
  }

  return values;
};
