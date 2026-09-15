import React from "react";

import "./input.css";

export const Input = ({ value, onChange, ...props }) => {
  return <input className="input" value={value} onChange={onChange} {...props} />;
};
