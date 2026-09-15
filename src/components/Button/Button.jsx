import React from "react";

import "./button.css";

export const Button = ({ children, onClick, danger, ...props }) => {
  return (
    <button onClick={onClick} className={danger ? "danger" : ""} {...props}>
      {children}
    </button>
  );
};
