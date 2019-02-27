import React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

export default function Dates(props) {
  const dates = props.dates.slice(1);
  return (
    <DayPicker
      numberOfMonths={2}
      initialMonth={new Date(2019, props.startMonth - 1)}
      disabledDays={dates}
    />
  );
}
