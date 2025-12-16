import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

import { IFormProps } from "../@types/form";

interface ISwitchProps extends IFormProps {
  SwitchProps?: Partial<MuiSwitchProps>;
  labelPlacement?: "end" | "start" | "top" | "bottom";
  disabled?: boolean;
  readOnly?: boolean;
}

export const Switch: React.FC<ISwitchProps> = ({
  name,
  control,
  label,
  SwitchProps,
  labelPlacement = "end",
  disabled = false,
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
                disabled={disabled || readOnly}
                color={error ? "error" : "primary"}
                readOnly={readOnly}
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
