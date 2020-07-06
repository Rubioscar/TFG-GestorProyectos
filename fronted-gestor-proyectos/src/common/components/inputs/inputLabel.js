import PropTypes from "prop-types";
import React from "react";

const InputLabel = ({ text, children }) => (
  <label htmlFor="satCenServices" className="label">
    {text}
    {children}
  </label>
);

export default InputLabel;
