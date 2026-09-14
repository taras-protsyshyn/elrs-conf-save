import React, { useState } from "react";
import { DownloadConfLib } from "../../containers";
import { Modal } from "../../components";
import { useProductTypeContext } from "../../context/ProductTypeContext";
import {
  useELRSConfigsContext,
  useELRSConfigsDispatcherContext,
} from "../../context/ELRSConfigsContext";
import { SelectConfigModal } from "../SelectConfigModal/SelectConfigModal";

export const SelectConfig = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <DownloadConfLib onDownload={() => setIsModalOpen(true)} />
      <SelectConfigModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
