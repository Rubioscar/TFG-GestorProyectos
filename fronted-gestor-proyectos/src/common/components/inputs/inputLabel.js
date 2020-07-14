import React from "react";

const InputLabel = ({ text, children }) => (
  <label htmlFor="" className="label">
    {text}
    {children}
  </label>
);

export default InputLabel;
