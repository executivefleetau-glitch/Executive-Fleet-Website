"use client";
import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";

export default function DatePickerComponent({ value, onChange }) {
  const [internalValue, setInternalValue] = useState(new Date());

  const handleChange = (date) => {
    if (onChange) {
      if (date) {
        // Use local date components to avoid timezone shifts
        const d = date.toDate ? date.toDate() : new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        onChange(formattedDate);
      } else {
        onChange("");
      }
    } else {
      setInternalValue(date);
    }
  };

  const getPickerValue = () => {
    if (value && typeof value === "string" && value.includes("-")) {
      const [year, month, day] = value.split("-").map(Number);
      return new Date(year, month - 1, day);
    }
    return value || internalValue;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <DatePicker
      format="MMMM DD YYYY"
      value={getPickerValue()}
      onChange={handleChange}
      minDate={today}
    />
  );
}
