import React from "react";
import { Controller } from "react-hook-form";

import { InputBaseComponentProps, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  DateTimePicker as DateTimePickerMui,
  DateTimePickerProps as DateTimePickerPropsMui,
} from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ptLocale from "date-fns/locale/pt-BR";

import { IFormProps } from "../@types/form";

interface IDatePickerProps extends IFormProps {
  inputProps?: InputBaseComponentProps;
  DateTimePickerProps?: Partial<DateTimePickerPropsMui<any, any>>;
}

export const DateTimePicker: React.FC<IDatePickerProps> = ({
  name,
  control,
  label,
  inputProps,

  DateTimePickerProps,
}) => (
  <Controller
    name={name}
    control={control}
    render={({
      field: { ref, value, onChange, onBlur },
      fieldState: { error },
    }) => (
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        locale={ptLocale}
        adapterLocale={ptLocale}
      >
        <DateTimePickerMui
          readOnly={!!inputProps?.readOnly}
          inputRef={ref}
          label={label}
          value={value}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              color="primary"
              size="small"
              error={!!error}
              helperText={error ? error.message : ""}
              onBlur={onBlur}
            />
          )}
          {...DateTimePickerProps}
          onChange={(e) => {
            onChange(e);
            DateTimePickerProps?.onChange?.(e);
          }}
        />
      </LocalizationProvider>
    )}
  />
);
