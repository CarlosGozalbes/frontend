import { useState, useEffect } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

moment.locale("es");
const localizer = momentLocalizer(moment);

function CalendarDoctor({ doctor }) {
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [availableAppointments, setAvailableAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (doctor && doctor.appointments) {
      setAppointments(
        doctor.appointments.map((appointment) => {
          const start = new Date(appointment.startTime);
          const end = new Date(appointment.endTime);
          return {
            title: appointment.title || "Consulta Medica",
            start: start,
            end: end,
          };
        })
      );
    }
  }, [doctor]);

  const transformSchedule = (schedule) => {
    if (!schedule) {
      return {};
    }

    const workingHours = {};
    const daysOfWeek = {
      Lunes: 1,
      Martes: 2,
      Miércoles: 3,
      Jueves: 4,
      Viernes: 5,
    };

    Object.keys(schedule).forEach((day) => {
      const dayNumber = daysOfWeek[day];
      const { morning, evening } = schedule[day];

      workingHours[dayNumber] = [];
      if (morning && morning.start && morning.end) {
        workingHours[dayNumber].push({
          start: morning.start,
          end: morning.end,
        });
      }
      if (evening && evening.start && evening.end) {
        workingHours[dayNumber].push({
          start: evening.start,
          end: evening.end,
        });
      }
    });

    return workingHours;
  };

  const workingHours = transformSchedule(doctor?.infoDoctor.schedule);

  const generateAvailableAppointments = (
    workingHours,
    existingAppointments,
    selectedDate
  ) => {
    const availableAppointments = [];
    const interval = 15;

    const dayOfWeek = moment(selectedDate).day();
    const now = moment();

    if (!workingHours[dayOfWeek]) return [];

    workingHours[dayOfWeek].forEach(({ start, end }) => {
      let startOfDay = moment(selectedDate).set({
        hour: moment(start, "HH:mm").hour(),
        minute: moment(start, "HH:mm").minute(),
      });
      const endOfDay = moment(selectedDate).set({
        hour: moment(end, "HH:mm").hour(),
        minute: moment(end, "HH:mm").minute(),
      });

      if (startOfDay.isBefore(now) && moment().isSame(selectedDate, "day")) {
        startOfDay = now
          .clone()
          .add(interval - (now.minute() % interval), "minutes")
          .startOf("minute");
      }

      let currentSlot = moment(startOfDay);
      while (currentSlot.isBefore(endOfDay)) {
        const isSlotAvailable = existingAppointments.every((appointment) => {
          const appointmentStart = moment(appointment.start);
          const appointmentEnd = moment(appointment.end);
          return !(
            currentSlot.isBetween(appointmentStart, appointmentEnd) ||
            currentSlot.isSame(appointmentStart)
          );
        });

        if (isSlotAvailable) {
          availableAppointments.push({
            start: moment(currentSlot),
            end: moment(currentSlot).add(interval, "minutes"),
          });
        }

        currentSlot.add(interval, "minutes");
      }
    });

    return availableAppointments;
  };

  const handleSelectSlot = ({ start }) => {
    const today = moment().startOf("day");
    const clickedDay = moment(start).startOf("day");
    if (
      clickedDay.isBefore(today, "day") ||
      clickedDay.day() === 0 ||
      clickedDay.day() === 6
    ) {
      console.log("Cannot select appointments for past dates or weekends.");
      return;
    }
    setSelectedDate(start);
    const appointmentsForDay = appointments.filter((appointment) =>
      moment(appointment.start).isSame(clickedDay, "day")
    );

    const availableAppointments = generateAvailableAppointments(
      workingHours,
      appointmentsForDay,
      start
    );
    setAvailableAppointments(availableAppointments);
  };

  const dayPropGetter = (date) => {
    const day = moment(date).startOf("day");
    const today = moment().startOf("day");
    const isWeekend = day.day() === 0 || day.day() === 6;
    const isBeforeToday = day.isBefore(today, "day");
    const appointmentsForDay = appointments.filter(
      (appointment) =>
        moment(appointment.start).isSame(day, "day") ||
        moment(appointment.end).isSame(day, "day")
    );

    let backgroundColor;
    let cursor;

    const availableAppointmentsForDay = generateAvailableAppointments(
      workingHours,
      appointmentsForDay,
      date
    );

    if (isBeforeToday) {
      backgroundColor = "rgba(211, 211, 211, 0.4)";
      cursor = "not-allowed";
    } else if (isWeekend) {
      backgroundColor = "rgba(192, 192, 192, 0.4)";
      cursor = "not-allowed";
    } else if (availableAppointmentsForDay.length === 0) {
      backgroundColor = "lightsalmon";
      cursor = "pointer";
    } else if (appointmentsForDay.length < 10) {
      backgroundColor = "rgba(205, 240, 186, 0.2)";
      cursor = "pointer";
    } else if (appointmentsForDay.length >= 10) {
      backgroundColor = "rgba(242, 217, 174, 0.4)";
      cursor = "pointer";
    }
    return {
      style: {
        backgroundColor,
        cursor,
      },
    };
  };

  useEffect(() => {
    const eventContentDivs = document.querySelectorAll(".rbc-event");
    eventContentDivs.forEach((div) => {
      div.remove();
    });
    const secondBtnGroup = document.querySelectorAll(".rbc-btn-group")[1];
    if (secondBtnGroup) {
      secondBtnGroup.remove();
    }
  }, []);

  const findSoonestAppointment = () => {
    const today = moment().startOf("day");
    const futureAppointments = [];

    for (let i = 0; i < 7; i++) {
      const date = today.clone().add(i, "days");
      const appointmentsForDay = appointments.filter((appointment) =>
        moment(appointment.start).isSame(date, "day")
      );

      const availableAppointmentsForDay = generateAvailableAppointments(
        workingHours,
        appointmentsForDay,
        date
      );

      if (availableAppointmentsForDay.length > 0) {
        futureAppointments.push(...availableAppointmentsForDay);
      }
    }

    if (futureAppointments.length > 0) {
      return futureAppointments.sort((a, b) => a.start - b.start)[0];
    }
    return null;
  };

  const soonestAppointment = findSoonestAppointment();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6}>
        <Calendar
          culture="es"
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          style={{ width: "100%", height: "550px", aspectRatio: 1 / 1 }}
          selectable={true}
          onSelectSlot={handleSelectSlot}
          dayPropGetter={dayPropGetter}
          onView={"month"}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        {soonestAppointment && (
          <div style={{ marginBottom: "20px" }}>
            <Link
              to={`/create-appointment/${moment(
                soonestAppointment.start
              ).format("YYYY-MM-DD")}T${moment(soonestAppointment.start).format(
                "HH:mm:ss"
              )}/${moment(soonestAppointment.start).format(
                "YYYY-MM-DD"
              )}T${moment(soonestAppointment.end).format("HH:mm:ss")}/${id}`}
            >
              <Button color="secondary" variant="contained" size="large">
                Reservar primera cita disponible
              </Button>
            </Link>
          </div>
        )}
        Fecha seleccionada:{" "}
        {selectedDate && moment(selectedDate).format("MMMM DD, YYYY")}
        <Typography variant="h6" gutterBottom>
          Citas disponibles
        </Typography>
        {availableAppointments.length === 0 ? (
          <Typography variant="body1">No hay citas disponibles</Typography>
        ) : (
          <Grid  container spacing={2}>
            {availableAppointments.map((appointment, index) => (
              <Grid item key={index} xs={6} sm={6} md={6}>
                {moment(appointment.start).format("HH:mm")} -{" "}
                {moment(appointment.end).format("HH:mm")}{" "}{" "}{" "}
                <Link
                  to={`/create-appointment/${moment(selectedDate).format(
                    "YYYY-MM-DD"
                  )}T${moment(appointment.start).format("HH:mm:ss")}/${moment(
                    selectedDate
                  ).format("YYYY-MM-DD")}T${moment(appointment.end).format(
                    "HH:mm:ss"
                  )}/${id}`}
                 
                >
                  <Button color="primary" variant="contained" size="small">
                    Reservar consulta
                  </Button>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default CalendarDoctor;
