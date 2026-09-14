import React from "react";
import { MdLibraryBooks } from "react-icons/md";

import {
  useELRSConfigsContext,
  useELRSConfigsDispatcherContext,
} from "../../context/ELRSConfigsContext";
import { useProductTypeContext } from "../../context/ProductTypeContext";
import { Button } from "../../components";

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
  const configs = useELRSConfigsContext();
  const dispatch = useELRSConfigsDispatcherContext();
  const { productType } = useProductTypeContext();

  const downloadConfigLib = async () => {
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

      dispatch({
        type: "init",
        configs: models.filter((model) => model.type === productType),
      });
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Помилка читання файлу:", error);
      }
    }
  };

  return (
    <Button
      onClick={async () => {
        if (configs?.length === 0) {
          await downloadConfigLib();
        }
        onDownload?.();
      }}
    >
      <MdLibraryBooks />
    </Button>
  );
};
