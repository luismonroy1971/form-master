'use client';
import React, { useEffect, useState } from 'react';
import { ButtonWrapper, Form, TitleL } from '@/components/components'; // Adjust the import path as necessary
import Image from 'next/image';
import axios from 'axios'; // Make sure axios is installed
import toast from 'react-hot-toast';
import { useStore } from '@/store';
import { useForm } from 'react-hook-form';
import { ButtonUnWrapperOutline } from '@/components/molecules/Button';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
export default function Edit({ params }: { params: { id: string } }) {
  // Define form input fields
  const formInputs = [
    {
      label: 'Nombres',
      name: 'Name1',
      type: 'text',
      required: true,
      placeholder: 'Nombres',
    },
    {
      label: 'Apellido Paterno',
      name: 'Surname1',
      type: 'text',
      required: true,
      placeholder: 'Apellido Paterno',
    },
    {
      label: 'Apellido Materno',
      name: 'Surname2',
      type: 'text',
      required: true,
      placeholder: 'Apellido Materno',
    },
    {
      id: 'DNIType',
      label: 'Tipo de Documento',
      name: 'DNIType',
      type: 'select',
      required: true,
      options: [
        { value: '01', label: 'DNI' },
        { value: '04', label: 'Carnet de Extranjería' },
      ],
    },
    {
      label: 'DNI',
      name: 'DNINumber',
      type: 'text',
      required: true,
      placeholder: 'DNI',
    },
    {
      label: 'Fecha de Nacimiento',
      name: 'BirthDate',
      type: 'date',
      required: true,
      placeholder: 'Fecha de Nacimiento',
    },
  ];
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      Name1: '',
      Surname1: '',
      Surname2: '',
      DNIType: '',
      DNINumber: '',
      BirthDate: '',
    },
  });

  const { data, isPending, error } = useQuery({
    queryKey: ['worker', params.id], // Dynamic queryKey based on `id`
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/masters/${params.id}`
      );
      return response.data;
    },
    enabled: !!params.id, // Only run query if `id` is not undefined
  });

  useEffect(() => {
    // Once data is fetched, reset the form values
    if (data) {
      console.log('data', data);
      form.setValue('Name1', data.Name1);
      form.setValue('Surname1', data.Surname1);
      form.setValue('Surname2', data.Surname2);
      form.setValue(
        'DNIType',
        formInputs[3].options?.find((opt) => opt.value === data.DNIType) as any
      );
      form.setValue('DNINumber', data.DNINumber);
      form.setValue('BirthDate', data.BirthDate);
      console.log('form', form.getValues());
    }
  }, [data]);

  if (isPending) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;

  // Function to handle form submission
  const onSubmit = (data: any) => {
    console.log(data);
    const transformedData = {
      Surname1: data.ap_paterno,
      Surname2: data.ap_materno,
      Name1: data.nombres,
      DNIType: data.DNIType?.value ?? data.DNIType,
      DNINumber: data.dni,
      BirthDate: data.fecha_nacimiento,
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/masters`, transformedData)
      .then((response) => {
        console.log('response', response);
        toast.success('Datos guardados correctamente');
        router.push('/admin/paso-3');
      })
      .catch((error) => {
        console.error('Failed to save data', error);
        toast.error('Error al guardar los datos');
      });
  };

  return (
    <>
      <div className="flex flex-col justify-center gap-4 mb-8 w-full">
        <TitleL>Editar Usuario</TitleL>
        <div className="w-full max-w-md flex flex-col gap-4 mt-4">
          <Form fields={formInputs} defaultValues={data} form={form} />
          <div className="flex justify-between gap-4">
            <div className="w-1/2">
              <ButtonUnWrapperOutline
                onClick={() => router.push('/admin')}
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
      </div>
    </>
  );
}
