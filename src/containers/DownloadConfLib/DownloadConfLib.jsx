import React from "react";
import { Button } from "../../components";
import { MdLibraryBooks } from "react-icons/md";

const parseConfiguration = async (file) => {
  const text = await file.text();
  const data = await JSON.parse(text);

  const models = [];
  for (let el of data.models) {
    models.push({ ...el, configuration: JSON.parse(el.configuration) });
  }
  return models;
};

export const DownloadConfLib = ({ onDownload }) => {
  const handleClick = async () => {
    try {
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: "JSON Config File",
            accept: { "application/json": [".json"] },
          },
        ],
        multiple: false,
      });

      const file = await fileHandle.getFile();
      const models = await parseConfiguration(file);

      onDownload?.(models);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Помилка читання файлу:", error);
      }
    }
  };

  return (
    <Button onClick={handleClick}>
      <MdLibraryBooks />
    </Button>
  );
};
