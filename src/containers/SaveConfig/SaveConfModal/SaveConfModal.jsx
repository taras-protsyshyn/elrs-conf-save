import React, { useState, useEffect } from "react";
import { Button, Modal, Input } from "../../../components";
import * as FileService from "../../../services/FileService";
import { takeFormValues } from "../../../services/FormService";
import { useProductTypeContext } from "../../../context/ProductTypeContext";
import {
  useELRSConfigsContext,
  useELRSConfigsDispatcherContext,
} from "../../../context/ELRSConfigsContext";

import "./saveConfModal.css";

export const SaveConfModal = ({ isOpen, onClose }) => {
  const dispatch = useELRSConfigsDispatcherContext();
  const configs = useELRSConfigsContext() || [];
  const selected = configs.find((config) => config.selected);
  const [updateCurrent, setUpdateCurrent] = useState(false);
  const [name, setName] = useState("");
  const { productType } = useProductTypeContext();

  const handleSaveNewConf = async (name, updateCurrent) => {
    onClose();

    const newConfig = {
      id: updateCurrent ? selected.id : Date.now().toString(),
      name,
      type: productType,
      configuration: takeFormValues(productType),
      selected: true,
    };

    if (updateCurrent) {
      await FileService.write(
        configs.map((config) => (config.id === selected.id ? newConfig : config)),
      );

      dispatch({ type: "update", config: newConfig });
    } else {
      await FileService.write([...configs, newConfig]);
      dispatch({ type: "add", config: newConfig });
    }
  };

  useEffect(() => {
    if (isOpen && selected) {
      setUpdateCurrent(true);
    }
  }, [isOpen]);

  return (
    <Modal
      bodyClassName="save-new-conf"
      onClose={onClose}
      title={
        selected && updateCurrent
          ? `Оновити конфігурацію ${selected.name}`
          : "Введіть назву нової конфігурації"
      }
      isOpen={isOpen}
      footerClassName={
        "save-new-conf__footer" +
        (selected && updateCurrent ? " save-new-conf__footer__plural" : "")
      }
      footer={
        <>
          {selected && updateCurrent && (
            <Button onClick={() => setUpdateCurrent(false)}>Створити нову</Button>
          )}
          <Button
            disabled={selected && updateCurrent ? false : name.length < 3}
            onClick={() => handleSaveNewConf(name || selected?.name, updateCurrent)}
          >
            {selected && updateCurrent ? "Оновити" : "Зберегти"}
          </Button>
        </>
      }
    >
      {(!selected || !updateCurrent) && (
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введіть назву нової конфігурації"
        />
      )}

      {configs.length === 0 && (
        <p>
          Увага! Ви попередньо не завантажили файл з конфігураціями. При збереженні нової
          конфігурації в файл <b>elrs_models.json</b>, ви перезапишете існуючі конфігурації які ви
          попереньо там зберегли.
        </p>
      )}
    </Modal>
  );
};
