import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { CalendarContainer } from "./CalendarContainer";
import { Day } from "./Day";
import { Modal } from "./Modal";
import { Month } from "./Month";
import { SelectCalendarDate } from "./SelectCalendarDate";
import { Week } from "./Week";

export enum View {
  MONTH = "month",
  WEEK = "week",
  DAY = "day",
}

export interface VisitaForm {
  id: string;
  empresa: string;
  tecnico: string;
  dataVisita: Date;
  horaInicial: string;
  horaFinal: string;
  descricao: string;
}

const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const endOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0);
const addMonths = (d: Date, n: number) =>
  new Date(d.getFullYear(), d.getMonth() + n, 1);
const addDays = (d: Date, n: number) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const addWeeks = (d: Date, n: number) => addDays(d, n * 7);
const startOfWeek = (d: Date, weekStartsOnMonday = true) => {
  const day = d.getDay();
  const diff = weekStartsOnMonday ? (day === 0 ? -6 : 1 - day) : -day;
  const result = new Date(d);
  result.setDate(d.getDate() + diff);
  result.setHours(0, 0, 0, 0);
  return result;
};
const endOfWeek = (d: Date) => addDays(startOfWeek(d), 6);

const formatMonthYear = (d: Date) => {
  const formated = d.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });
  return formated.charAt(0).toUpperCase() + formated.slice(1);
};

const formatDayShort = (d: Date) => {
  const formated = d.toLocaleDateString("pt-BR", { weekday: "short" });
  return formated.charAt(0).toUpperCase() + formated.slice(1).replace(".", "");
};

const formatDayNumber = (d: Date) => d.getDate();

const formatDate = (d: Date) => d.toLocaleDateString("pt-BR");

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 5) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      options.push(timeString);
    }
  }
  return options;
};

const empresasOptions = ["Empresa A", "Empresa B", "Empresa C", "Empresa D"];

const tecnicosOptions = ["Técnico 1", "Técnico 2", "Técnico 3", "Técnico 4"];

const simulateBackendRequest = (month: number, year: number) => {
  const visits: VisitaForm[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    if (Math.random() > 0.7) {
      const visitCount = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < visitCount; j++) {
        visits.push({
          id: `${year}-${month}-${i}-${j}`,
          empresa:
            empresasOptions[Math.floor(Math.random() * empresasOptions.length)],
          tecnico:
            tecnicosOptions[Math.floor(Math.random() * tecnicosOptions.length)],
          dataVisita: new Date(year, month, i),
          horaInicial: "08:00",
          horaFinal: "09:00",
          descricao: `Visita ${j + 1} do dia ${i}`,
        });
      }
    }
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(visits), 300);
  });
};

export const Visitas = () => {
  const [view, setView] = useState<View>(View.MONTH);
  const [activeDate, setActiveDate] = useState<Date>(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"list" | "form">("list");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [empresa, setEmpresa] = useState("");
  const [tecnico, setTecnico] = useState("");
  const [horaInicial, sethoraInicial] = useState("");
  const [horaFinal, sethoraFinal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [monthVisits, setMonthVisits] = useState<VisitaForm[]>([]);
  const [editingVisit, setEditingVisit] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [datePickerAnchor, setDatePickerAnchor] = useState<HTMLElement | null>(
    null,
  );
  const [tempDate, setTempDate] = useState<Date>(new Date());

  const timeOptions = useMemo(() => generateTimeOptions(), []);

  const fetchMonthVisits = async (date: Date) => {
    setLoading(true);
    try {
      const visits = await simulateBackendRequest(
        date.getMonth(),
        date.getFullYear(),
      );
      setMonthVisits(visits as any[]);
    } catch (error) {
      console.error("Erro ao buscar visitas:", error);
      setMonthVisits([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthVisits(activeDate);
  }, [activeDate]);

  const getVisitsForDay = (date: Date) => {
    return monthVisits.filter(
      (visit) =>
        visit.dataVisita!.getDate() === date.getDate() &&
        visit.dataVisita!.getMonth() === date.getMonth() &&
        visit.dataVisita!.getFullYear() === date.getFullYear(),
    );
  };

  const getTitle = () => {
    switch (view) {
      case View.MONTH:
        return formatMonthYear(activeDate);
      case View.WEEK:
        const weekStart = startOfWeek(activeDate);
        const weekEnd = endOfWeek(activeDate);
        return `Semana: ${formatDate(weekStart)} - ${formatDate(weekEnd)}`;
      case View.DAY:
        return `Dia: ${formatDate(activeDate)}`;
      default:
        return formatMonthYear(activeDate);
    }
  };

  const monthMatrix = useMemo(() => {
    const start = startOfMonth(activeDate);
    const end = endOfMonth(activeDate);

    const firstCell = startOfWeek(start);
    const weeks: Date[][] = [];
    let cursor = new Date(firstCell);
    while (cursor <= end || weeks.length < 6) {
      const week: Date[] = [];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(cursor));
        cursor = addDays(cursor, 1);
      }
      weeks.push(week);

      if (cursor > end && weeks.length >= 4) {
        break;
      }
    }
    return weeks;
  }, [activeDate]);

  const weekDays = useMemo(() => {
    const start = startOfWeek(activeDate);
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(start, i));
    }
    return days;
  }, [activeDate]);

  const handlePrev = () => {
    switch (view) {
      case View.MONTH:
        setActiveDate((d) => addMonths(d, -1));
        break;
      case View.WEEK:
        setActiveDate((d) => addWeeks(d, -1));
        break;
      case View.DAY:
        setActiveDate((d) => addDays(d, -1));
        break;
    }
  };

  const handleNext = () => {
    switch (view) {
      case View.MONTH:
        setActiveDate((d) => addMonths(d, 1));
        break;
      case View.WEEK:
        setActiveDate((d) => addWeeks(d, 1));
        break;
      case View.DAY:
        setActiveDate((d) => addDays(d, 1));
        break;
    }
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setModalMode("list");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
    setModalMode("list");
    setEditingVisit(null);
    resetForm();
  };

  const resetForm = () => {
    setEmpresa("");
    setTecnico("");
    sethoraInicial("");
    sethoraFinal("");
    setDescricao("");
    setEditingVisit(null);
  };

  const handleNewVisit = () => {
    setModalMode("form");
    resetForm();
  };

  const handleEditVisit = (visit: VisitaForm) => {
    setEditingVisit(visit);
    setEmpresa(visit.empresa);
    setTecnico(visit.tecnico);
    sethoraInicial(visit.horaInicial);
    sethoraFinal(visit.horaFinal);
    setDescricao(visit.descricao);
    setModalMode("form");
  };

  const handleSubmit = () => {
    console.log({
      id: editingVisit?.id || `new-${Date.now()}`,
      empresa,
      tecnico,
      dataVisita: selectedDate,
      horaInicial,
      horaFinal,
      descricao,
    });
    handleCloseModal();
  };

  const handleTitleClick = (event: React.MouseEvent<HTMLElement>) => {
    setTempDate(new Date(activeDate));
    setDatePickerAnchor(event.currentTarget);
  };

  const handleDatePickerClose = () => {
    setDatePickerAnchor(null);
  };

  const handleDateChange = () => {
    setActiveDate(new Date(tempDate));
    handleDatePickerClose();
  };

  const dayVisits = selectedDate ? getVisitsForDay(selectedDate) : [];

  const renderCalendarContent = () => {
    switch (view) {
      case View.MONTH:
        return (
          <Month
            {...{
              activeDate,
              monthMatrix,
              formatDayShort,
              getVisitsForDay,
              handleDayClick,
              formatDayNumber,
            }}
          />
        );
      case View.WEEK:
        return (
          <Week
            {...{
              weekDays,
              formatDayShort,
              getVisitsForDay,
              handleDayClick,
              formatDayNumber,
              handleEditVisit,
            }}
          />
        );
      case View.DAY:
        return (
          <Day
            {...{
              dayVisitsDisplay: getVisitsForDay(activeDate),
              activeDate,
              formatDayShort,
              handleDayClick,
              formatDayNumber,
              handleEditVisit,
            }}
          />
        );
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <RadioGroup
          row
          value={view}
          onChange={(e) => setView(e.target.value as View)}
          aria-label="view"
        >
          <FormControlLabel
            value={View.MONTH}
            control={<Radio />}
            label="Mês"
          />
          <FormControlLabel
            value={View.WEEK}
            control={<Radio />}
            label="Semana"
          />
          <FormControlLabel value={View.DAY} control={<Radio />} label="Dia" />
        </RadioGroup>
      </Box>

      <CalendarContainer
        {...{
          view,
          handlePrev,
          handleTitleClick,
          getTitle,
          handleNext,
        }}
      >
        {renderCalendarContent()}
      </CalendarContainer>

      <SelectCalendarDate
        {...{
          datePickerAnchor,
          handleDatePickerClose,
          view,
          tempDate,
          setTempDate,
          handleDateChange,
        }}
      />

      <Modal
        {...{
          modalOpen,
          handleCloseModal,
          selectedDate,
          dayVisits,
          handleEditVisit,
          handleNewVisit,
          editingVisit,
          setEmpresa,
          empresasOptions,
          tecnico,
          setTecnico,
          modalMode,
          empresa,
          tecnicosOptions,
          horaInicial,
          sethoraInicial,
          timeOptions,
          horaFinal,
          sethoraFinal,
          descricao,
          setDescricao,
          setModalMode,
          handleSubmit,
        }}
      />
    </>
  );
};
