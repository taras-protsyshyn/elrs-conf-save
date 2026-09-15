import React from "react";
import { MdLibraryBooks } from "react-icons/md";
import * as FileService from "../../services/FileService";

import {
  useELRSConfigsContext,
  useELRSConfigsDispatcherContext,
} from "../../context/ELRSConfigsContext";
import { useProductTypeContext } from "../../context/ProductTypeContext";
import { Button } from "../../components";

export const DownloadConfLib = ({ onDownload }) => {
  const configs = useELRSConfigsContext();
  const dispatch = useELRSConfigsDispatcherContext();
  const { productType } = useProductTypeContext();

  const downloadConfigLib = async () => {
    try {
      const models = await FileService.read();

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
