import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function SchedulingCalendar({ rooms }) {
  // TODO: Use the rooms data to render events on the calendar

  const events = rooms.map((room) => ({
    start: new Date(room.checkIn),
    end: new Date(room.checkOut),
    title: `Room ${room.roomNumber}: ${room.guestName} ${room.guestContact}`,
  }));

  const handleSelectSlot = ({ start, end }) => {
    // Handle the selected slot (start and end time) here
    console.log("Selected Slot Start:", start);
    console.log("Selected Slot End:", end);
  };

  const handleNavigate = (newDate, view) => {
    // Handle the date change here, e.g., update the state or fetch new data
    console.log("New Date:", newDate);
    console.log("New View:", view);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default SchedulingCalendar;
