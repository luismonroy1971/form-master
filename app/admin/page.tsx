'use client';
import { ParagraphM, SubtitleL } from '@/components/atoms/typography';
import { ButtonWrapper, TitleM, TitleS } from '@/components/components';
import { Table } from '@/components/organisms/Table';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useQuery,
} from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function AdminPage() {
  const queryClient = new QueryClient();
  const router = useRouter();
  const { isPending, error, data } = useQuery({
    queryKey: ['workers'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/masters`
      );
      return data;
    },
  });

  if (isPending) return 'Loading...';
  if (error) return 'An error has occurred: ' + error.message;


  const columns = [
    {
      Header: 'Nombre',
      accessor: 'Name1',
    },
    {
      Header: 'Apellido Paterno',
      accessor: 'Surname1',
    },
    {
      Header: 'Apellido Materno',
      accessor: 'Surname2',
    },
    {
      Header: 'DNI',
      accessor: 'DNINumber',
    },
    {
      Header: 'Fecha de Nacimiento',
      accessor: 'BirthDate',
      Cell: ({ value }: any) => {
        // Asegurarse de que value es una fecha válida.
        const date = new Date(value);
        if (isNaN(date.getTime())) {
          // Manejar adecuadamente valores inválidos.
          return 'Fecha inválida';
        } else {
          // Especificar el locale y las opciones de formato.
          return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
        }
      },
    },
    {
      Header: 'Acciones',
      accessor: '_id',
      Cell: ({ value }: any) => {
        return (
          <div className="flex gap-2">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-md"
              onClick={() => router.push(`/admin/editar/${value}`)}
            >
              Editar
            </button>
            <button className="bg-red-500 text-white px-2 py-1 rounded-md">
              Eliminar
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex justify-between items-center w-full shadow-md p-4 mb-4 mt-4">
        <SubtitleL>Lista de trabajadores</SubtitleL>
        <ButtonWrapper onClick={() => router.push('/admin/paso-1')}>
          Añadir
        </ButtonWrapper>
      </div>
      <Table columns={columns} data={data} />
    </HydrationBoundary>
  );
}
