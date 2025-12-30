import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

import { IFormProps } from "../@types/form";

interface ITextFieldProps extends IFormProps {
  TextFieldProps?: Partial<MuiTextFieldProps>;
  type?: "text" | "number" | "email" | "password" | "tel" | "url" | "search";
  multiline?: boolean;
  rows?: number;
  readOnly?: boolean;
  autoComplete?: boolean;
}

export const TextField: React.FC<ITextFieldProps> = ({
  name,
  control,
  label,
  TextFieldProps,
  type = "text",
  multiline = false,
  rows = 4,
  readOnly,
  autoComplete = true,
}) => {
  const uniqueName = React.useRef(
    `field-${Math.random().toString(36).substring(2, 11)}`,
  ).current;

  const autoCompleteProps = autoComplete
    ? {
        autoComplete: "new-password",
        autoCorrect: "off",
        name: uniqueName,
      }
    : {};

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { ref, value, onChange, onBlur },
        fieldState: { error },
      }) => {
        const userSlotProps = TextFieldProps?.slotProps || {};

        return (
          <MuiTextField
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
            autoComplete="off"
            slotProps={{
              input: {
                readOnly,
                ...autoCompleteProps,
                ...userSlotProps.input,
              },
              ...userSlotProps,
            }}
            {...TextFieldProps}
          />
        );
      }}
    />
  );
};
