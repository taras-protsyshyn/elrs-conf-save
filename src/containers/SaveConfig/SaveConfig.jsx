import React from "react";
import { Button } from "../../components";
import { MdSave } from "react-icons/md";

export const SaveConfig = ({ onSave }) => {
  const handleClick = () => {
    onSave?.();
  };

  return (
    <Button onClick={handleClick}>
      <MdSave />
    </Button>
  );
};
