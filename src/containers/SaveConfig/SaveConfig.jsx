import React, { useState } from "react";
import { MdSave } from "react-icons/md";
import { SaveConfModal } from "./SaveConfModal/SaveConfModal";
import { Button } from "../../components";

export const SaveConfig = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        <MdSave />
      </Button>
      <SaveConfModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
