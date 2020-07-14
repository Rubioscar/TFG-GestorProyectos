import moment from "moment";
import React, { useCallback, useMemo, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputLabel from "./inputLabel";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const transformDateToTypes = ({ utcDate }, date) => {
  if (utcDate) {
    return moment(date)
      .utcOffset(0)
      .add(moment().utcOffset(), "minutes")
      .format();
  }
  return date;
};

const DateInput = ({
  inputProps,
  onChange,
  label,
  value,
  uncontrolled,
  utcDate,
  validation,
  readOnly,
  classFieldName
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [lastValue, setLastValue] = useState(value);
  const inputRef = useRef(null);
  const onInputChange = useCallback(
    eventValue => {
      if (eventValue !== "" && validation && !validation(eventValue)) {
        setInputValue(lastValue);
      } else {
        onChange(
          eventValue
            ? transformDateToTypes({ utcDate }, eventValue)
            : eventValue
        );
        setInputValue(eventValue);
        setLastValue(eventValue);
      }
    },
    [lastValue, onChange, utcDate, validation]
  );
  const dateValue = useMemo(() => {
    const originValue = uncontrolled ? inputValue : value;
    return originValue ? moment(originValue).toDate() : null;
  }, [uncontrolled, inputValue, value]);

  let inputElement = (
    <span className={`field`}>
      <span className="control">
        <DatePicker
          className={`input ${classFieldName}`}
          ref={inputRef}
          selected={dateValue}
          onChange={onInputChange}
          strictParsing
          disabled={readOnly}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...inputProps}
        />
      </span>
    </span>
  );

  if (label) {
    inputElement = <InputLabel text={label}>{inputElement}</InputLabel>;
  }
  return inputElement;
};

export default DateInput;
