import {
  FormControlLabel,
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
  FormControl,
  FormHelperText,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { IFormProps } from "../@types/form";

interface ISwitchProps extends IFormProps {
  SwitchProps?: Partial<MuiSwitchProps>;
  labelPlacement?: "end" | "start" | "top" | "bottom";
  disabled?: boolean;
  required?: boolean;
}

export const Switch: React.FC<ISwitchProps> = ({
  name,
  control,
  label,
  SwitchProps,
  labelPlacement = "end",
  disabled = false,
  required = false,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { ref, value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <FormControl error={!!error} component="fieldset" fullWidth>
          <FormControlLabel
            control={
              <MuiSwitch
                {...SwitchProps}
                inputRef={ref}
                checked={!!value}
                onChange={(event) => {
                  onChange(event.target.checked);
                  SwitchProps?.onChange?.(event, event.target.checked);
                }}
                onBlur={onBlur}
                disabled={disabled}
                required={required}
                color={error ? "error" : "primary"}
              />
            }
            label={label}
            labelPlacement={labelPlacement}
          />
          {error && (
            <FormHelperText sx={{ marginLeft: 0 }}>
              {error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
