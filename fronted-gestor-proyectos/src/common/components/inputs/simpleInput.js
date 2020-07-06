/* eslint-disable react/forbid-prop-types */
import React, { useCallback, useMemo, useRef, useState } from "react";
import InputLabel from "./inputLabel";

const SimpleInput = React.memo(
  ({
    inputProps,
    onChange,
    type,
    label,
    value,
    uncontrolled,
    validation,
    readOnly,
    allowIncorrectValues,
    classFieldName,
    classInputName,
    name,
    placeholder
  }) => {
    const propValue = value === null ? "" : value;
    const [lastValue, setLastValue] = useState(propValue);
    const inputRef = useRef(null);
    const onInputChange = useCallback(
      event => {
        const changedValue = event.target.value;
        if (
          changedValue !== "" &&
          validation &&
          !allowIncorrectValues &&
          !validation(changedValue)
        ) {
          inputRef.current.value = !lastValue ? "" : lastValue;
        } else {
          onChange(changedValue);
          setLastValue(changedValue);
        }
      },
      [allowIncorrectValues, lastValue, onChange, validation]
    );
    const inputElementProps = useMemo(() => {
      const inputElementPropsList = {};

      if (!uncontrolled) {
        inputElementPropsList.value = propValue;
      }

      return { ...inputElementPropsList, ...inputProps };
    }, [inputProps, uncontrolled, propValue]);

    const validElement = validation && value ? validation(String(value)) : true;

    let inputElement = (
      <span className={`field ${classFieldName}`}>
        <span className="control">
          <input
            className={`input ${
              validElement ? "" : "incorrectValue"
            } ${classInputName}`}
            ref={inputRef}
            onChange={onInputChange}
            type={type}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...inputElementProps}
            disabled={readOnly}
            placeholder={placeholder}
            name={name}
          />
        </span>
      </span>
    );

    if (label) {
      inputElement = <InputLabel text={label}>{inputElement}</InputLabel>;
    }
    return inputElement;
  }
);

export default SimpleInput;
