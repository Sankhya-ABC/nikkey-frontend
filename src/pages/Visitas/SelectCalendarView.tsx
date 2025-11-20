import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { View } from "./type";

interface SelectCalendarViewProps {
  view: View;
  setView: React.Dispatch<React.SetStateAction<View>>;
}

export const SelectCalendarView: React.FC<SelectCalendarViewProps> = ({
  view,
  setView,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <RadioGroup
        row
        value={view}
        onChange={(e) => setView(e.target.value as View)}
        aria-label="view"
      >
        <FormControlLabel value={View.MONTH} control={<Radio />} label="Mês" />
        <FormControlLabel
          value={View.WEEK}
          control={<Radio />}
          label="Semana"
        />
        <FormControlLabel value={View.DAY} control={<Radio />} label="Dia" />
      </RadioGroup>
    </Box>
  );
};
