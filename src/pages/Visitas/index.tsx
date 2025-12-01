import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";
import { Layout } from "../../components/Template/Layout";
import { CRUDType } from "../../services/types";
import { CalendarContainer } from "./CalendarContainer";
import { Day } from "./Day";
import { FormCRUDVisita } from "./FormCRUDVisita";
import { ListOfVisitsPerDay } from "./ListOfVisitsPerDay";
import { Month } from "./Month";
import { SelectCalendarDate } from "./SelectCalendarDate";
import { SelectCalendarView } from "./SelectCalendarView";
import { Week } from "./Week";
import { simulateBackendRequest } from "./provider";
import { ModalMode, View, VisitaForm } from "./type";
import { getDateRange } from "./utils";

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
    setModalMode(ModalMode.CRUD);
    setFormType(CRUDType.CREATE);
    setSelectedVisit(null);
  };

  const handleEditVisit = (visit: VisitaForm) => {
    setSelectedVisit(visit);
    setModalMode(ModalMode.CRUD);
    setFormType(CRUDType.UPDATE);
    setModalOpen(true);
  };

  const handleCRUDSubmit = (data: VisitaForm) => {
    console.log("Dados do formulário:", {
      ...data,
      id: formType === CRUDType.UPDATE ? selectedVisit?.id : null,
    });

    handleCloseModal();

    fetchMonthVisits(activeDate, view);
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
  const fetchMonthVisits = async (date: Date, currentView: View) => {
    setLoading(true);
    try {
      const { startDate, endDate } = getDateRange(date, currentView);
      const visits = await simulateBackendRequest(startDate, endDate);
      setMonthVisits(visits);
    } catch (error) {
      console.error("Erro ao buscar visitas:", error);
      setMonthVisits([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthVisits(activeDate, view);
  }, [activeDate, view]);

  return (
    <Loading {...{ loading, setLoading }}>
      <Layout title="Visitas" spacing={0}>
        <Grid item size={{ xs: 12 }}>
          <SelectCalendarView {...{ view, setView }} />
        </Grid>

        <Grid item size={{ xs: 12 }}>
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
        </Grid>

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

        <ListOfVisitsPerDay
          {...{
            modalOpen: modalOpen && modalMode === ModalMode.LIST,
            handleCloseModal,
            selectedDate,
            dayVisits,
            handleEditVisit,
            handleNewVisit,
          }}
        />

        <FormCRUDVisita
          {...{
            modalOpen: modalOpen && modalMode === ModalMode.CRUD,
            handleCloseModal,
            formType,
            selectedDate,
            selectedVisit,
            handleCRUDSubmit,
          }}
        />
      </Layout>
    </Loading>
  );
};
