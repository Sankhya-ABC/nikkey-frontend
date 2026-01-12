import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
  SelectProps as MuiSelectProps,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

import { IFormProps } from "../@types/form";

interface ISelectProps extends IFormProps {
  SelectProps?: Partial<MuiSelectProps>;
  options: any[];
  propertyLabel: string;
  propertyValue: string;
  disabled?: boolean;
  placeholder?: string;
  multiple?: boolean;
  native?: boolean;
  autoWidth?: boolean;
  readOnly?: boolean;
}

export const Select: React.FC<ISelectProps> = ({
  name,
  control,
  label,
  options,
  propertyLabel,
  propertyValue,
  SelectProps,
  disabled = false,
  placeholder,
  multiple = false,
  native = false,
  autoWidth = false,
  readOnly,
}) => {
  const labelId = `${name}-label`;

  const getOptionLabel = (option: any) => {
    return option[propertyLabel] || "";
  };

  const getOptionValue = (option: any) => {
    return option[propertyValue] || "";
  };

  const findOptionByValue = (value: string | number) => {
    return options.find((opt) => getOptionValue(opt) === value);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { ref, value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <FormControl fullWidth error={!!error} disabled={disabled} size="small">
          {label && <InputLabel id={labelId}>{label}</InputLabel>}
          <MuiSelect
            {...SelectProps}
            labelId={labelId}
            inputRef={ref}
            value={value ?? (multiple ? [] : "")}
            onChange={onChange}
            onBlur={onBlur}
            label={label}
            displayEmpty={!!placeholder}
            multiple={multiple}
            native={native}
            autoWidth={autoWidth}
            input={native ? undefined : <OutlinedInput label={label} />}
            readOnly={readOnly || options?.length === 0}
            renderValue={
              native
                ? undefined
                : (selected) => {
                    if (multiple) {
                      const selectedValues = selected as (string | number)[];
                      if (selectedValues.length === 0 && placeholder) {
                        return (
                          <span style={{ color: "#999" }}>{placeholder}</span>
                        );
                      }
                      return selectedValues
                        .map((val) => {
                          const option = findOptionByValue(val);
                          return option ? getOptionLabel(option) : val;
                        })
                        .join(", ");
                    }

                    if (!selected && placeholder) {
                      return (
                        <span style={{ color: "#999" }}>{placeholder}</span>
                      );
                    }

                    const option = findOptionByValue(selected);
                    return option ? getOptionLabel(option) : selected;
                  }
            }
          >
            {placeholder && !native && (
              <MenuItem value="" disabled>
                <span style={{ color: "#999" }}>{placeholder}</span>
              </MenuItem>
            )}

            {native ? (
              <>
                {placeholder && (
                  <option value="" disabled>
                    {placeholder}
                  </option>
                )}
                {options.map((option, index) => (
                  <option key={index} value={getOptionValue(option)}>
                    {getOptionLabel(option)}
                  </option>
                ))}
              </>
            ) : (
              options.map((option, index) => (
                <MenuItem key={index} value={getOptionValue(option)}>
                  {multiple && (
                    <Checkbox
                      checked={((value as any[]) || []).includes(
                        getOptionValue(option),
                      )}
                    />
                  )}
                  <ListItemText primary={getOptionLabel(option)} />
                </MenuItem>
              ))
            )}
          </MuiSelect>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
