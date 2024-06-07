import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export const checkDoctorAvailability = (doctor, startDate, endDate) => {
  // Convert input dates to Day.js objects for comparison
  const start = dayjs(startDate).startOf('day');
  const end = dayjs(endDate).endOf('day');

  // Check if doctor has a working schedule and appointments
  if (!doctor.infoDoctor.schedule || !doctor.appointments) {
    return false;
  }

  // Get doctor's working hours
  const schedule = doctor.infoDoctor.schedule;

  // Filter appointments that overlap with the requested period
  const overlappingAppointments = doctor.appointments.filter((appointment) => {
    const appointmentStart = dayjs(appointment.startTime);
    const appointmentEnd = dayjs(appointment.endTime);
    return (
      appointmentStart.isBetween(start, end, null, '[]') ||
      appointmentEnd.isBetween(start, end, null, '[]') ||
      start.isBetween(appointmentStart, appointmentEnd, null, '[]') ||
      end.isBetween(appointmentStart, appointmentEnd, null, '[]')
    );
  });

  // Helper function to check if there's a 30-minute free slot
  const hasFreeSlot = (daySchedule) => {
    const { morning, evening } = daySchedule;

    const checkPeriod = (periodStart, periodEnd) => {
      if (!periodStart || !periodEnd) return false;

      let freeSlotStart = dayjs(periodStart, "HH:mm");
      const workEnd = dayjs(periodEnd, "HH:mm");

      for (let j = 0; j <= overlappingAppointments.length; j++) {
        let appointmentStart = j < overlappingAppointments.length ? dayjs(overlappingAppointments[j].startTime) : workEnd;

        if (appointmentStart.diff(freeSlotStart, 'minute') >= 30) {
          return true;
        }

        freeSlotStart = dayjs(overlappingAppointments[j].endTime);
      }

      return false;
    };

    return checkPeriod(morning.start, morning.end) || checkPeriod(evening.start, evening.end);
  };

  // Check if the doctor has a free slot on any of the days within the specified date range
  for (let current = start; current.isBefore(end) || current.isSame(end, 'day'); current = current.add(1, 'day')) {
    const dayOfWeek = current.format('dddd'); // Get the day of the week in English

    // Map day of the week to the corresponding Spanish key in the schedule
    const dayMap = {
      Monday: "Lunes",
      Tuesday: "Martes",
      Wednesday: "Miércoles",
      Thursday: "Jueves",
      Friday: "Viernes",
      Saturday: "Sábado",
      Sunday: "Domingo"
    };
    const dayKey = dayMap[dayOfWeek];

    if (schedule[dayKey] && hasFreeSlot(schedule[dayKey])) {
      return true;
    }
  }

  return false;
};
