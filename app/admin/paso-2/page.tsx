'use client';
import React, { useState } from 'react';
import { ButtonWrapper, Form, TitleL } from '@/components/components'; // Adjust the import path as necessary
import Image from 'next/image';
import axios from 'axios'; // Make sure axios is installed
import toast from 'react-hot-toast';
import { useStore } from '@/store';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ButtonUnWrapperOutline } from '@/components/molecules/Button';
export default function StepTwo() {
  const router = useRouter();
  const formData = useStore.getState().formData;
  const [defaultValues, setDefaultValues] = useState(formData);
  const form = useForm({ defaultValues });
  const [steps, setSteps] = useState([
    {
      name: 'Paso 1',
      step: 1,
      active: false,
    },
    {
      name: 'Paso 2',
      step: 2,
      active: true,
    },
  ]);

  // Define form input fields
  const formInputs = [
    {
      label: 'Nombre',
      name: 'nombres',
      type: 'text',
      required: true,
      placeholder: 'Nombres',
    },
    {
      label: 'Apellido Paterno',
      name: 'ap_paterno',
      type: 'text',
      required: true,
      placeholder: 'Apellido Paterno',
    },
    {
      label: 'Apellido Materno',
      name: 'ap_materno',
      type: 'text',
      required: true,
      placeholder: 'Apellido Materno',
    },
    {
      label: 'Tipo de Documento',
      name: 'tipo_documento',
      type: 'select',
      required: true,
      options: [
        {
          value: '01',
          label: 'DNI',
        },
        {
          value: '04',
          label: 'Carnet de Extranjería',
        },
      ],
    },
    {
      label: 'DNI',
      name: 'dni',
      type: 'text',
      required: true,
      placeholder: 'DNI',
    },
    {
      label: 'Fecha de Nacimiento',
      name: 'fecha_nacimiento',
      type: 'date',
      required: true,
      placeholder: 'Fecha de Nacimiento',
    },
  ];

  // Function to handle form submission
  const onSubmit = form.handleSubmit((data: any) => {
    console.log(data, 'data');
    const transformedData = {
      Surname1: data.ap_paterno,
      Surname2: data.ap_materno,
      Name1: data.nombres,
      DNIType: data.tipo_documento?.value,
      DNINumber: data.dni,
      BirthDate: data.fecha_nacimiento,
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/masters`, transformedData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        console.log('response', response);
        toast.success('Datos guardados correctamente');
        router.push('/admin');
      })
      .catch((error) => {
        console.error('Failed to save data', error);
        toast.error('Error al guardar los datos');
      });
  });

  return (
    <>
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
        <div className="flex justify-between gap-4">
          <div className="w-1/2">
            <ButtonUnWrapperOutline
              onClick={() => router.push('/admin/paso-1')}
              width={100}
              color="bg-gray-400"
            >
              Volver
            </ButtonUnWrapperOutline>
          </div>
          <div className="w-1/2">
            <ButtonWrapper onClick={onSubmit} width={100}>
              Guardar
            </ButtonWrapper>
          </div>
        </div>
      </div>
    </>
  );
}
