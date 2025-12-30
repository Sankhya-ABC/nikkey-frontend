import { InputBaseComponentProps } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePickerProps as MuiDatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ptBR } from "date-fns/locale/pt-BR";
import React from "react";
import { Controller } from "react-hook-form";

import { IFormProps } from "../@types/form";

import { StyledDatePicker } from "./styles";

type IViews = "year" | "month" | "day";

interface IDatePickerProps extends IFormProps {
  DatePickerProps?: Partial<MuiDatePickerProps<any>>;
  inputProps?: InputBaseComponentProps;
  minDate?: Date;
  maxDate?: Date;
  views?: IViews[];
  disablePast?: boolean;
  fullWidth?: boolean;
  readOnly?: boolean;
}

export const DatePicker: React.FC<IDatePickerProps> = ({
  name,
  control,
  label,
  inputProps,
  DatePickerProps,
  maxDate,
  minDate,
  views,
  disablePast,
  fullWidth = true,
  readOnly,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { ref, value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <StyledDatePicker
            {...(DatePickerProps as any)}
            disablePast={disablePast}
            views={views ?? (DatePickerProps as any)?.views}
            label={label}
            value={value ?? null}
            minDate={(DatePickerProps as any)?.minDate ?? minDate}
            maxDate={(DatePickerProps as any)?.maxDate ?? maxDate}
            slotProps={{
              textField: {
                fullWidth: fullWidth,
                color: "primary",
                size: "small",
                inputRef: ref,
                onBlur,
                inputProps: inputProps as any,
                error: !!error,
                helperText: error?.message ?? "",
              } as any,
            }}
            readOnly={readOnly}
            onChange={(newValue) => {
              onChange(newValue);
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};
