'use client'
import React, { useState } from "react";
import { ParagraphM } from "../atoms/typography";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  error?: boolean;
  labelText?: string;
  placeholderText?: string;
  errorText?: string;
  setFormValue?: (arg: string) => void;
  type?: string;
  disabled?: boolean;
  max?: number;
  value?: string;
  icon?: React.ReactNode;
}

export default function Input({
  required,
  error,
  labelText,
  placeholderText,
  errorText = "Campo inválido",
  setFormValue,
  disabled,
  type,
  max,
  value,
  icon,
}: InputProps) {
  const [inputValue, setInputValue] = useState(value || "");
  const [inputError, setInputError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setFormValue && setFormValue(newValue);
    setInputError(false);
  };

  if(type == 'date' && inputValue.includes('T')) {
    console.log('inputValue', inputValue);
    setInputValue(inputValue.split('T')[0]);
  }

  const handleBlur = () => {
    switch (type) {
      case "text":
        if (!/^[A-Za-z\s]+$/.test(inputValue)) {
          setInputError(true);
        }
        break;
      case "number":
        if (!/^\d+$/.test(inputValue)) {
          setInputError(true);
        }
        break;
      case "email":
        if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputValue)
        ) {
          setInputError(true);
        }
        break;
      default:
        break;
    }
  };

  return (
    <label className="w-full">
      {labelText && (
        <div className="mb-1">
          <ParagraphM fontWeight="semibold">
            {labelText}
            {required && <span className="text-red-500"> *</span>}
          </ParagraphM>
        </div>
      )}
      <div className="relative">
        <input
          className={`${
            disabled
              ? "bg-gray-200 cursor-not-allowed py-2 px-3 h-12 text-sm"
              : "py-2 px-3 bg-white h-12 text-sm"
          } ${
            inputError || error ? "border-red-500" : "border-gray-300 border"
          } w-full rounded-md outline-1 outline-primary`}
          placeholder={placeholderText}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          type={type}
          min={1}
          step={1}
          onInput={(e) => {
            e.currentTarget.validity.valid || (e.currentTarget.value = "");
          }}
          max={max}
          value={inputValue}
        />
        {icon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {icon}
          </div>
        )}
      </div>
      {inputError || error ? <span className="text-sm text-red-500">{errorText}</span> : null}
    </label>
  );
}
