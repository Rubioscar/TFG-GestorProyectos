import React, { useCallback, useMemo } from "react";
import InputLabel from "./inputLabel";

const optionsValueTypes = {
  NUMBER: "number",
  STRING: "string"
};

const RadioButtonsInput = ({
  inputProps,
  options,
  onChange,
  optionsValueField,
  optionsLabelField,
  readOnly,
  label,
  uncontrolled,
  value
}) => {
  const onInputChange = useCallback(
    value => () => {
      onChange(value);
    },
    [onChange]
  );

  const radioButtonsElementProps = useMemo(() => {
    const radioButtonsElementPropsList = {};
    if (!uncontrolled) {
      const radioButtonsValue = value || "";
      radioButtonsElementPropsList.value = radioButtonsValue;
    }

    return { ...radioButtonsElementPropsList, ...inputProps };
  }, [inputProps, uncontrolled, value]);

  let radioButtonsElements = (
    <>
      {options.map(option => (
        <span className="radioButtonsInput" key={option[optionsValueField]}>
          <input
            id="requestTypes"
            type="radio"
            checked={value === option[optionsValueField]}
            onChange={onInputChange(option[optionsValueField])}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...radioButtonsElementProps}
            disabled={readOnly}
          />
          {option[optionsLabelField]}
        </span>
      ))}
    </>
  );

  if (label) {
    radioButtonsElements = (
      <InputLabel text={label}>{radioButtonsElements}</InputLabel>
    );
  }
  return radioButtonsElements;
};

export default RadioButtonsInput;
