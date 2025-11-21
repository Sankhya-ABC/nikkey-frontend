import { useEffect, useState } from "react";
import { CalendarContainer } from "./CalendarContainer";
import { Day } from "./Day";
import { Month } from "./Month";
import { SelectCalendarDate } from "./SelectCalendarDate";
import { SelectCalendarView } from "./SelectCalendarView";
import { VisitaModal } from "./VisitaModal";
import { Week } from "./Week";
import { simulateBackendRequest } from "./provider";
import { ModalMode, View, VisitaForm } from "./type";
import { CRUDType } from "../../types";

export const Visitas = () => {
  const [view, setView] = useState<View>(View.MONTH);
  const [activeDate, setActiveDate] = useState<Date>(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>(ModalMode.LIST);
  const [formType, setFormType] = useState<CRUDType>(CRUDType.CREATE);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedVisit, setSelectedVisit] = useState<VisitaForm | null>(null);
  const [monthVisits, setMonthVisits] = useState<VisitaForm[]>([]);
  const [loading, setLoading] = useState(false);
  const [datePickerAnchor, setDatePickerAnchor] = useState<HTMLElement | null>(
    null,
  );
  const [tempDate, setTempDate] = useState<Date>(new Date());

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setModalMode(ModalMode.LIST);
    setFormType(CRUDType.CREATE);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
    setModalMode(ModalMode.LIST);
    setSelectedVisit(null);
    setFormType(CRUDType.CREATE);
  };

  const handleNewVisit = () => {
    setModalMode(ModalMode.FORM);
    setFormType(CRUDType.CREATE);
    setSelectedVisit(null);
  };

  const handleEditVisit = (visit: VisitaForm) => {
    setSelectedVisit(visit);
    setModalMode(ModalMode.FORM);
    setFormType(CRUDType.UPDATE);
  };

  const handleModeChange = (mode: ModalMode) => {
    setModalMode(mode);
    if (mode === ModalMode.LIST) {
      setFormType(CRUDType.CREATE);
      setSelectedVisit(null);
    }
  };

  const handleCRUDSubmit = (data: VisitaForm) => {
    console.log("Dados do formulário:", {
      ...data,
      id: formType === CRUDType.UPDATE ? selectedVisit?.id : null,
    });

    handleCloseModal();

    fetchMonthVisits(activeDate);
  };

  // handlers
  // -- select calendar date
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

      <VisitaModal
        {...{
          modalOpen,
          handleCloseModal,
          modalMode,
          formType,
          selectedDate,
          dayVisits,
          selectedVisit,
          handleEditVisit,
          handleNewVisit,
          handleCRUDSubmit,
          handleModeChange,
        }}
      />
    </>
  );
};
