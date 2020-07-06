import PropTypes from "prop-types";
import React, { useCallback, useMemo } from "react";
import InputLabel from "./inputLabel";

const TextAreaInput = ({
  inputProps,
  onChange,
  label,
  value,
  uncontrolled,
  readOnly
}) => {
  const onInputChange = useCallback(
    event => {
      const {
        target: { value }
      } = event;
      onChange(value);
    },
    [onChange]
  );
  const textAreaElementProps = useMemo(() => {
    const inputElementPropsList = {};

    if (!uncontrolled) {
      inputElementPropsList.value = value;
    }

    return { ...inputElementPropsList, ...inputProps };
  }, [inputProps, uncontrolled, value]);

  let textAreaElement = (
    <textarea
      className="textarea"
      onChange={onInputChange}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...textAreaElementProps}
      disabled={readOnly}
    />
  );

  if (label) {
    textAreaElement = <InputLabel text={label}>{textAreaElement}</InputLabel>;
  }
  return textAreaElement;
};

export default TextAreaInput;
