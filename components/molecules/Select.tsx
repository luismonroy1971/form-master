import React, { useEffect } from 'react';
import Select from 'react-select';
import Async from 'react-select/async';
import { ParagraphS, SubtitleM } from '../atoms/typography';

interface SelectWrapperProps {
  isFocused: boolean;
  width: string;
  selectProps: { error: {} };
}

const customStyles = {
  container: (provided: any) => {
    return {
      ...provided,
      width: '100%',
      color: '#000',
    };
  },
  placeholder: (provided: any) => {
    return {
      ...provided,
      fontWeight: 400,
      fontSize: '.875rem',
      textAlign: 'left',
      lineHeight: '1.25rem',
      color: '#ADB5BD',
    };
  },
  indicatorSeparator: () => ({}),
  dropdownIndicator: (provided: any) => ({
    provided,
    padding: 0,
    lineHeight: 0,
    color: '#ADB5BD',
  }),
  singleValue: (provided: any) => {
    return {
      ...provided,
      fontFamily: 'Inter',
      fontWeight: 400,
      fontSize: '.875rem',
      textAlign: 'left',
      color: '#000',
    };
  },
  valueContainer: (provided: any) => {
    return {
      ...provided,
      padding: 0,
      color: '#000',
    };
  },
  input: (provided: any) => {
    return {
      ...provided,
      margin: 0,
      padding: 0,
      color: '#000',
    };
  },
  menu: (provided: any) => {
    return {
      ...provided,
      width: '100%',
      padding: '1rem',
      background: 'white',
      boxShadow: '0rem 0.75rem 1.5rem 0rem rgba(176, 184, 192, 0.2)',
      borderRadius: '.75rem',
      marginTop: '.25rem',
    };
  },
};

export const CustomSelect = (props: any) => {
  const SelectComponent = props.asyncConfig ? Async : Select;

  console.log('props', props);
  return (
    <div className="flex flex-col w-full text-black">
      <div className="flex flex-row justify-between">
        <ParagraphS>
          {props.label}
        </ParagraphS>
      </div>
      <SelectComponent
        {...props}
        width="100%"
        error={props.error}
        name={props.name}
        options={props.options}
        styles={customStyles}
        placeholder={props.placeholderText || 'Selecciona una opción'}
        onChange={props.setValue}
        value={props.value}
        openMenuOnFocus={true}
        isDisabled={props.disabled}
        {...(props.asyncConfig || {})}
      />
      {props.error && <ParagraphS>{props.errorText}</ParagraphS>}
    </div>
  );
};
