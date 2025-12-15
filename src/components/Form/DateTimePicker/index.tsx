import { InputBaseComponentProps } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  DateTimePicker as DateTimePickerMui,
  DateTimePickerProps as DateTimePickerPropsMui,
} from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ptBR } from "date-fns/locale/pt-BR";
import React from "react";
import { Controller } from "react-hook-form";

import { IFormProps } from "../@types/form";

interface IDatePickerProps extends IFormProps {
  inputProps?: InputBaseComponentProps;
  DateTimePickerProps?: Partial<DateTimePickerPropsMui>;
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
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <DateTimePickerMui
          readOnly={!!inputProps?.readOnly}
          inputRef={ref}
          label={label}
          value={value}
          slotProps={{
            textField: {
              fullWidth: true,
              color: "primary",
              size: "small",
              inputRef: ref,
              onBlur,
              inputProps: inputProps as any,
              error: !!error,
              helperText: error?.message ?? "",
            } as any,
          }}
          {...DateTimePickerProps}
          onChange={(e) => {
            onChange(e);
          }}
        />
      </LocalizationProvider>
    )}
  />
);
