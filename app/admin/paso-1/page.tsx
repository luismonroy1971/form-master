'use client';
import React, { useEffect, useState } from 'react';
import { ButtonWrapper, Form, TitleL, TitleS } from '@/components/components'; // Adjust the import path as necessary
import Image from 'next/image';
import axios from 'axios'; // Make sure axios is installed
import toast from 'react-hot-toast';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function StepOne() {
  const [steps, setSteps] = useState([
    {
      name: 'Paso 1',
      step: 1,
      active: true,
    },
    {
      name: 'Paso 2',
      step: 2,
      active: false,
    },
  ]);
  const form = useForm();
  const router = useRouter();
  const defaultValues = {
    nro_documento: '',
  };
  console.log('defaultValues', defaultValues);
  const fetchDefaultValues = async () => {
    const endpoint = `https://facturalahoy.com/api/persona/${form.getValues(
      'nro_documento'
    )}/FACTURALAYA_V013UG5FN7S9W4XRJSIZ`;
    try {
      const response = await axios.get(endpoint);
      console.log('response', response);
      // fecha nac 27/04/1991
      const dateString = response.data.fecha_nacimiento;
      const [day, month, year] = dateString.split('/');
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(
        2,
        '0'
      )}`;
      response.data.fecha_nacimiento = formattedDate;
      useStore.setState({ formData: response.data });
      router.push('/admin/paso-2');
    } catch (error) {
      console.error('Failed to fetch default values', error);
    }
  };

  // Define form input fields
  const formInputs = [
    {
      name: 'nro_documento',
      type: 'text',
      required: true,
      placeholder: 'Número de documento',
    },
  ];

  useEffect(() => {
    useStore.setState({ formData: defaultValues });
  }, [defaultValues]);

  return (
    <>
      <div
        className="flex justify-between items-center w-full cursor-pointer"
        onClick={() => router.push('/')}
      >
        <TitleS>Volver</TitleS>
      </div>
      <div className="flex justify-center gap-4 mb-8">
        {steps.map((step) => (
          <div
            key={step.step}
            className={`text-lg font-bold w-20 h-12 flex items-center justify-center text-center border rounded-2xl ${
              step.active ? 'text-blue-500 ' : 'text-gray-400'
            }`}
          >
            {step.name}
          </div>
        ))}
      </div>
      <TitleL>Formulario</TitleL>
      <div className="w-full max-w-md flex flex-col gap-4 mt-4">
        <Form fields={formInputs} defaultValues={defaultValues} form={form} />
        <ButtonWrapper onClick={fetchDefaultValues} width={100}>
          Continuar
        </ButtonWrapper>
      </div>
    </>
  );
}
