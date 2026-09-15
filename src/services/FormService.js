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

export const takeFormValues = () => {
  const form = getForm();
  const formData = new FormData(form);
  const values = {};

  for (const [key, value] of formData.entries()) {
    values[key] = value;
  }

  return values;
};
