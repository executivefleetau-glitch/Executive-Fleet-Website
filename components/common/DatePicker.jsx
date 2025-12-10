"use client";
import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";

export default function DatePickerComponent({ value, onChange }) {
  const [internalValue, setInternalValue] = useState(new Date());

  const handleChange = (date) => {
    if (onChange) {
      // Convert to YYYY-MM-DD format for consistency
      const formattedDate = date ? new Date(date).toISOString().split('T')[0] : '';
      onChange(formattedDate);
    } else {
      setInternalValue(date);
    }
  };

  return (
    <DatePicker 
      format="MMMM DD YYYY" 
      value={value || internalValue} 
      onChange={handleChange} 
    />
  );
}
