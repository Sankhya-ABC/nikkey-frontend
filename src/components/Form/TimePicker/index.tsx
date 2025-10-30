import { InputBaseComponentProps } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  TimePicker as TimePickerMui,
  TimePickerProps as MuiTimePickerProps,
} from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ptBR } from "date-fns/locale/pt-BR";
import React from "react";
import { Controller } from "react-hook-form";
import { IFormProps } from "../@types/form";

type ITimeView = "hours" | "minutes" | "seconds";

interface ITimePickerProps extends IFormProps {
  TimePickerProps?: Partial<MuiTimePickerProps<any>>;
  inputProps?: InputBaseComponentProps;
  minTime?: Date;
  maxTime?: Date;
  disablePast?: boolean;
  disableFuture?: boolean;
  views?: ITimeView[];
  ampm?: boolean;
}

export const TimePicker: React.FC<ITimePickerProps> = ({
  name,
  control,
  label,
  inputProps,
  TimePickerProps,
  maxTime,
  minTime,
  disablePast,
  disableFuture,
  views,
  ampm = false,
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
          <TimePickerMui
            {...(TimePickerProps as any)}
            disablePast={disablePast}
            disableFuture={disableFuture}
            views={views ?? (TimePickerProps as any)?.views}
            ampm={ampm}
            label={label}
            value={value ?? null}
            minTime={(TimePickerProps as any)?.minTime ?? minTime}
            maxTime={(TimePickerProps as any)?.maxTime ?? maxTime}
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
            onChange={(newValue) => {
              onChange(newValue);
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};
