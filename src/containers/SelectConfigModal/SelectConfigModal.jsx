import React, { useEffect, useState } from "react";
import { Button, Modal } from "../../components";
import {
  useELRSConfigsContext,
  useELRSConfigsDispatcherContext,
} from "../../context/ELRSConfigsContext";
import { applyConfigToForm } from "../../services/FormService";

import "./SelectConfigModal.css";

export const SelectConfigModal = ({ isOpen, onClose }) => {
  const configs = useELRSConfigsContext();
  const dispatch = useELRSConfigsDispatcherContext();

  const [selectedConfig, setSelectedConfig] = useState(null);

  const handleSelectConfig = (config) => {
    setSelectedConfig(config);
  };

  const handleApply = () => {
    if (selectedConfig) {
      applyConfigToForm(selectedConfig);

      dispatch({ type: "select", id: selectedConfig.id });
      onClose();
    }
  };

  useEffect(() => {
    isOpen && setSelectedConfig(configs?.find((config) => config.selected) || null);
  }, [isOpen]);

  return (
    <Modal
      title="Вибір конфігурації"
      isOpen={isOpen}
      onClose={onClose}
      onClosed={() => setSelectedConfig(null)}
      bodyClassName="select-config-modal-body"
      footerClassName="footer"
      footer={
        <>
          <Button onClick={handleApply}>Застосувати</Button>
        </>
      }
    >
      <ul className="config-list">
        {configs.map((config) => (
          <li
            key={config.id}
            className={`config-item ${config.id === selectedConfig?.id ? "selected" : ""}`}
          >
            <button
              onClick={() => handleSelectConfig(config)}
              type="button"
              className="config-button"
            >
              <b>{config.type}</b> <span>{config.name}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="selected-config">
        {selectedConfig && <pre>{JSON.stringify(selectedConfig.configuration, null, 2)}</pre>}
      </div>
    </Modal>
  );
};
