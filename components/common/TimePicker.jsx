"use client";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

export default function TimePickerComponent({ value, onChange }) {
  const [internalValue, setInternalValue] = useState(new Date().getTime());

  const handleChange = (time) => {
    if (onChange) {
      // Convert to HH:MM format (24-hour) for HTML time input compatibility
      if (time) {
        const date = new Date(time);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
        onChange(formattedTime);
      } else {
        onChange('');
      }
    } else {
      setInternalValue(time);
    }
  };

  // If value is provided in HH:MM format, convert it to a Date object for the picker
  const getPickerValue = () => {
    if (value && typeof value === 'string' && value.includes(':')) {
      const [hours, minutes] = value.split(':');
      const today = new Date();
      today.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      return today;
    }
    return value || internalValue;
  };

  return (
    <DatePicker
      disableDayPicker
      value={getPickerValue()}
      format="hh:mm A"
      onChange={handleChange}
      plugins={[<TimePicker />]}
    />
  );
}
