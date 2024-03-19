'use client';

import React, { useEffect } from 'react';
import Input from '../molecules/Input';
import { ButtonWrapper } from '../components';
import { Controller } from 'react-hook-form';
import { CustomSelect } from '../molecules/Select';

export interface FormField {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  validation?: Object;
  options?: any[]; // Only for select fields
  isMulti?: boolean; // Only for select fields
  max?: number; // Only for text fields
}

interface ReusableFormProps {
  defaultValues: any;
  fields: FormField[];
  form: any;
}

const Form: React.FC<ReusableFormProps> = ({
  defaultValues,
  fields,
  form: { register, handleSubmit, setValue, control, errors, watch },
}) => {
  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'text':
        return (
          <Input
            key={field.name}
            labelText={field.label}
            placeholderText={field.placeholder}
            setFormValue={(value: string) => setValue(field.name, value)}
            {...register(field.name, field.validation)}
            max={field.max}
            value={defaultValues[field.name] || ''}
          />
        );
      case 'date':
        return (
          <Input
            key={field.name}
            labelText={field.label}
            placeholderText={field.placeholder}
            setFormValue={(value: string) => setValue(field.name, value)}
            {...register(field.name, field.validation)}
            type="date"
            value={defaultValues[field.name] || ''}
          />
        );
      case 'select':
        return (
          <CustomSelect
            {...field}
            {...register(field.name)}
            errorText={`Campo inválido ${field.label?.toLowerCase()}`}
            label={field.label}
            id={field.name}
            options={field.options}
            setValue={(value: any) => {
              setValue(field.name, value);
            }}
            value={watch(field.name)}
            name={field.name}
            register={register(field.name)}
          />
        );
      default:
        return null;
    }
  };

  return <div className="flex flex-col gap-4">{fields.map(renderField)}</div>;
};

export default Form;
