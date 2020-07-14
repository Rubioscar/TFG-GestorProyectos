import React, { useCallback, useMemo } from "react";
import InputLabel from "./inputLabel";

const collectionValueTypes = {
  NUMBER: "number",
  STRING: "string"
};

const SelectInput = ({
  inputProps,
  data,
  onChange,
  collectionValueField,
  collectionLabelField,
  collectionValueType,
  label,
  uncontrolled,
  value,
  readOnly
}) => {
  // console.log(data)
  const onInputChange = useCallback(
    event => {
      let {
        target: { value }
      } = event;

      if (!value) {
        return false;
      }

      switch (collectionValueType) {
        case collectionValueTypes.NUMBER:
          value = parseInt(value, 10);
          break;
        default:
      }
      const resultado = data.find(option => option.id == value);
      onChange(value, resultado);
      return true;
    },
    [collectionValueType, data, onChange]
  );

  const selectElementProps = useMemo(() => {
    const selectElementPropsList = {};
    if (!uncontrolled) {
      const selectValue = value || "";
      selectElementPropsList.value = selectValue;
    }

    return { ...selectElementPropsList, ...inputProps };
  }, [inputProps, uncontrolled, value]);

  let selectElements = (
    <span className="select">
      <select
        disabled={readOnly}
        onChange={onInputChange}
        className="in"
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...selectElementProps}
      >
        {!value && (
          <option key="selectNullValue" value={null}>
            Seleciona una...
          </option>
        )}
        {data.map(dataElement => (
          <option
            key={dataElement.id}
            value={dataElement.id}
          >
            {dataElement.description}
          </option>
        ))}
      </select>
    </span>
  );

  if (label) {
    selectElements = <InputLabel text={label}>{selectElements}</InputLabel>;
  }
  return selectElements;
};

export default SelectInput;
