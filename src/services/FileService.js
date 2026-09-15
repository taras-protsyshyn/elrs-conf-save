const parseConfiguration = async (file) => {
  const text = await file.text();
  const data = await JSON.parse(text);

  const models = [];
  for (let el of data.models) {
    models.push({ ...el, configuration: JSON.parse(el.configuration) });
  }
  return models;
};

const formatConfig = (configs) =>
  JSON.stringify({
    models: configs.map((config) => {
      return {
        id: config.id,
        name: config.name,
        type: config.type,
        configuration: JSON.stringify(config.configuration),
      };
    }),
  });

const options = {
  startIn: "documents",
  suggestedName: "elrs_models.json",
  types: [
    {
      description: "JSON Config File",
      accept: { "application/json": [".json"] },
    },
  ],
  multiple: false,
};

const write = async (content) => {
  const handle = await window.showSaveFilePicker(options);

  const writable = await handle.createWritable();

  await writable.write(formatConfig(content));
  await writable.close();
};

const read = async () => {
  const [handle] = await window.showOpenFilePicker(options);
  const file = await handle.getFile();
  const content = await file.text();
  return parseConfiguration(file);
};

export { write, read };
