import { useEffect, useState } from "react";
import { CalendarContainer } from "./CalendarContainer";
import { Day } from "./Day";
import { Modal } from "./Modal";
import { Month } from "./Month";
import { SelectCalendarDate } from "./SelectCalendarDate";
import { SelectCalendarView } from "./SelectCalendarView";
import { Week } from "./Week";
import {
  empresasOptions,
  simulateBackendRequest,
  tecnicosOptions,
} from "./provider";
import { View, VisitaForm } from "./type";

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

  // handlers
  // -- select caldendar date
  const handleDatePickerClose = () => {
    setDatePickerAnchor(null);
  };

  const handleSelectCalendarDate = (event: React.MouseEvent<HTMLElement>) => {
    setTempDate(new Date(activeDate));
    setDatePickerAnchor(event.currentTarget);
  };

  const handleCalendarDateChange = () => {
    setActiveDate(new Date(tempDate));
    handleDatePickerClose();
  };

  // -- calendar day's visits
  const handleGetVisitsForDay = (date: Date) => {
    return monthVisits.filter(
      (visit) =>
        visit.dataVisita!.getDate() === date.getDate() &&
        visit.dataVisita!.getMonth() === date.getMonth() &&
        visit.dataVisita!.getFullYear() === date.getFullYear(),
    );
  };

  const dayVisits = selectedDate ? handleGetVisitsForDay(selectedDate) : [];

  // requisitions
  const fetchMonthVisits = async (date: Date) => {
    setLoading(true);
    try {
      const visits = await simulateBackendRequest(
        date.getMonth(),
        date.getFullYear(),
      );
      setMonthVisits(visits);
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

  return (
    <>
      <SelectCalendarView {...{ view, setView }} />

      <CalendarContainer
        {...{
          view,
          handleSelectCalendarDate,
          activeDate,
          setActiveDate,
        }}
      >
        {view === View.MONTH && (
          <Month
            {...{
              activeDate,
              handleGetVisitsForDay,
              handleDayClick,
            }}
          />
        )}

        {view === View.WEEK && (
          <Week
            {...{
              activeDate,
              handleGetVisitsForDay,
              handleDayClick,
              handleEditVisit,
            }}
          />
        )}

        {view === View.DAY && (
          <Day
            {...{
              dayVisitsDisplay: handleGetVisitsForDay(activeDate),
              activeDate,
              handleDayClick,
              handleEditVisit,
            }}
          />
        )}
      </CalendarContainer>

      <SelectCalendarDate
        {...{
          datePickerAnchor,
          handleDatePickerClose,
          view,
          tempDate,
          setTempDate,
          handleCalendarDateChange,
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
