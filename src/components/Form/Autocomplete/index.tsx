import {
  CircularProgress,
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";

import { IFormProps } from "../@types/form";

interface IAutocompleteProps extends IFormProps {
  AutocompleteProps?: Partial<
    MuiAutocompleteProps<any, boolean, boolean, boolean>
  >;
  fetchOptions: (search: string) => Promise<any[]>;
  propertyLabel: string;
  propertyValue: string;
  disabled?: boolean;
  placeholder?: string;
  multiple?: boolean;
  readOnly?: boolean;
  debounceTime?: number;
  minCharsToSearch?: number;
  loadingText?: string;
  noOptionsText?: string;
  errorText?: string;
  onOptionSelected?: (option: any) => void;
}

export const Autocomplete: React.FC<IAutocompleteProps> = ({
  name,
  control,
  label,
  fetchOptions,
  propertyLabel,
  propertyValue,
  AutocompleteProps,
  disabled = false,
  placeholder,
  multiple = false,
  readOnly,
  debounceTime = 300,
  minCharsToSearch = 0,
  loadingText = "Carregando...",
  noOptionsText = "Nenhuma opção encontrada",
  errorText = "Erro ao carregar opções",
  onOptionSelected,
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const getOptionLabel = (option: any) => {
    if (typeof option === "string") return option;
    return option[propertyLabel] || "";
  };

  const isOptionEqualToValue = (option: any, value: any) => {
    if (!option || !value) return false;
    const optionValue =
      typeof option === "object" ? option[propertyValue] : option;
    const valueValue = typeof value === "object" ? value[propertyValue] : value;
    return optionValue === valueValue;
  };

  const loadOptions = async (search: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchOptions(search);
      setOptions(data);
    } catch (err) {
      setError(errorText);
      setOptions([]);
      console.error("Erro ao carregar opções:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) {
      setOptions([]);
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (searchTerm.length >= minCharsToSearch) {
      debounceTimer.current = setTimeout(() => {
        loadOptions(searchTerm);
      }, debounceTime);
    } else {
      setOptions([]);
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchTerm, open, minCharsToSearch, debounceTime]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { ref, value, onChange, onBlur },
        fieldState: { error: fieldError },
      }) => {
        const handleInputChange = (_: any, newInputValue: string) => {
          setSearchTerm(newInputValue);
        };

        const handleChange = (_: any, newValue: any) => {
          onChange(newValue);
          if (onOptionSelected && newValue) {
            onOptionSelected(newValue);
          }
          onBlur();
        };

        const getDisplayValue = () => {
          if (!value) return multiple ? [] : null;

          if (multiple) {
            if (!Array.isArray(value)) return [];
            return value.map((val) =>
              typeof val === "object"
                ? val
                : { [propertyValue]: val, [propertyLabel]: val },
            );
          }

          return typeof value === "object"
            ? value
            : { [propertyValue]: value, [propertyLabel]: value };
        };

        return (
          <MuiAutocomplete
            {...AutocompleteProps}
            size="small"
            multiple={multiple}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            options={options}
            loading={loading}
            disabled={disabled || readOnly}
            readOnly={readOnly}
            filterOptions={(x) => x}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={isOptionEqualToValue}
            value={getDisplayValue()}
            onChange={handleChange}
            onInputChange={handleInputChange}
            loadingText={loadingText}
            noOptionsText={
              error
                ? errorText
                : searchTerm.length < minCharsToSearch && searchTerm.length > 0
                  ? `Digite pelo menos ${minCharsToSearch} caracteres`
                  : noOptionsText
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                inputRef={ref}
                onBlur={onBlur}
                error={!!fieldError || !!error}
                helperText={fieldError?.message || error || ""}
                placeholder={placeholder}
                InputProps={{
                  ...params.InputProps,
                  readOnly,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        );
      }}
    />
  );
};
