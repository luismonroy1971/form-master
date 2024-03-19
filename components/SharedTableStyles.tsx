import React from 'react';

const Down = ({ className }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);
const Up = ({ className }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m4.5 15.75 7.5-7.5 7.5 7.5"
    />
  </svg>
);

export const TableWrapper = ({ children }: any) => (
  <div className="bg-white w-full rounded-lg p-4 pb-0 shadow-md flex flex-col box-border overflow-x-auto">
    {children}
  </div>
);

export const TableStyle = ({ children }: any) => (
  <table className="w-full table-fixed border-collapse">{children}</table>
);

export const TableH = ({ children }: any) => (
  <th className="text-left p-4 pt-0 w-full">{children}</th>
);

export const TableData = ({ children }: any) => (
  <td className="flex items-center h-auto p-4 w-full">{children}</td>
);

export const TableButtonsWrapper = ({ children, showFilter }: any) => (
  <div
    className={`flex ${showFilter ? 'w-1/5' : 'w-1/8'} ${
      showFilter ? 'justify-between' : 'justify-end'
    }`}
  >
    {children}
  </div>
);

export const PaginationWrapper = ({ children }: any) => (
  <div className="mt-6">{children}</div>
);

export const HeaderWrapper = ({ children }: any) => (
  <div className="flex hover:text-white">{children}</div>
);

export const DownArrow = ({ className }: any) => (
  <Down className={`ml-2 text-white ${className}`} />
);

export const UpArrow = ({ className }: any) => (
  <Up className={`ml-2 text-white ${className}`} />
);

export const InputsWrapper = ({ children }: any) => (
  <div className="mb-8 flex justify-between">{children}</div>
);
