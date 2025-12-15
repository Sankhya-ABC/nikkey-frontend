import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

import { IFormProps } from "../@types/form";

interface ITextFieldProps extends IFormProps {
  TextFieldProps?: Partial<MuiTextFieldProps>;
  type?: "text" | "number" | "email" | "password" | "tel" | "url";
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
}

export const TextField: React.FC<ITextFieldProps> = ({
  name,
  control,
  label,
  TextFieldProps,
  type = "text",
  multiline = false,
  rows = 4,
  maxLength,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { ref, value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <MuiTextField
          {...TextFieldProps}
          fullWidth
          color="primary"
          size="small"
          type={type}
          label={label}
          value={value ?? ""}
          inputRef={ref}
          onBlur={onBlur}
          onChange={onChange}
          error={!!error}
          helperText={error?.message ?? ""}
          multiline={multiline}
          rows={multiline ? rows : undefined}
          inputProps={{
            maxLength,
            ...TextFieldProps?.inputProps,
          }}
        />
      )}
    />
  );
};
