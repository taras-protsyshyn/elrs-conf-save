import React, { useState } from "react";
import { DownloadConfLib } from "../../containers";
import { Modal } from "../../components";

export const SelectConfig = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <DownloadConfLib
      onDownload={(models) => {
        console.log(models);
        setIsModalOpen(true);
      }}
    />
  );
};
