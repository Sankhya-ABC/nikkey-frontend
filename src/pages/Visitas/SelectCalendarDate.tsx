import {
  Box,
  Button,
  MenuItem,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { View } from ".";

interface SelectCalendarDateProps {
  datePickerAnchor: HTMLElement | null;
  handleDatePickerClose: () => void;
  view: View;
  tempDate: Date;
  setTempDate: React.Dispatch<React.SetStateAction<Date>>;
  handleDateChange: () => void;
}

export const SelectCalendarDate: React.FC<SelectCalendarDateProps> = ({
  datePickerAnchor,
  handleDatePickerClose,
  view,
  tempDate,
  setTempDate,
  handleDateChange,
}) => {
  return (
    <Popover
      open={Boolean(datePickerAnchor)}
      anchorEl={datePickerAnchor}
      onClose={handleDatePickerClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box sx={{ p: 2, minWidth: 300 }}>
        <Typography variant="h6" gutterBottom>
          Selecione a data
        </Typography>

        {view === View.MONTH && (
          <>
            <TextField
              fullWidth
              select
              label="Mês"
              value={tempDate.getMonth()}
              onChange={(e) =>
                setTempDate(
                  new Date(
                    tempDate.getFullYear(),
                    parseInt(e.target.value),
                    tempDate.getDate(),
                  ),
                )
              }
              margin="normal"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <MenuItem key={i} value={i}>
                  {new Date(2000, i, 1).toLocaleDateString("pt-BR", {
                    month: "long",
                  })}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              select
              label="Ano"
              value={tempDate.getFullYear()}
              onChange={(e) =>
                setTempDate(
                  new Date(
                    parseInt(e.target.value),
                    tempDate.getMonth(),
                    tempDate.getDate(),
                  ),
                )
              }
              margin="normal"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <MenuItem key={i} value={new Date().getFullYear() - 5 + i}>
                  {new Date().getFullYear() - 5 + i}
                </MenuItem>
              ))}
            </TextField>
          </>
        )}

        {(view === View.WEEK || view === View.DAY) && (
          <>
            <TextField
              fullWidth
              type="date"
              label="Data"
              value={tempDate.toISOString().split("T")[0]}
              onChange={(e) => setTempDate(new Date(e.target.value))}
              margin="normal"
            />
          </>
        )}

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}
        >
          <Button onClick={handleDatePickerClose}>Cancelar</Button>
          <Button variant="contained" onClick={handleDateChange}>
            Aplicar
          </Button>
        </Box>
      </Box>
    </Popover>
  );
};
