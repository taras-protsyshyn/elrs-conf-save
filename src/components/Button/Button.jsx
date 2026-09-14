import React from "react";

import "./button.css";

export const Button = ({ children, onClick, danger }) => {
  return (
    <button onClick={onClick} className={danger ? "danger" : ""}>
      {children}
    </button>
  );
};
