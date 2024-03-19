import React from 'react';
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination
} from 'react-table';
import { Pagination } from '../molecules/Pagination';
import {
  TableWrapper,
  TableH,
  TableData,
  HeaderWrapper,
  DownArrow,
  UpArrow,
} from '../SharedTableStyles';

const CUSTOM_RENDER_COLUMNS = ['Status', 'Actions', 'Requests', 'FV Status'];

interface ITable {
  columns: any;
  data: any;
  rowClick?: any;
  showFilter?: any;
  onClick?: any;
  showAddNewConnection?: any;
  openModal?: any;
  tableType?: string;
  loading?: boolean;
}

export const Table = ({
  columns = [],
  data = [],
  rowClick = null,
  loading = false,
}: ITable) => {
  const memoizedColumns = React.useMemo(() => columns, [columns]);
  const memoizedData = React.useMemo(() => data, [data]);
  rowClick = rowClick || null;
  loading = loading || false;

  // useTable hook
  const tableInstance = useTable(
    {
      columns: memoizedColumns,
      data: memoizedData,
      initialState: { pageSize: 5 },
      loading,
    } as any,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    pageCount,
    pageSize,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  }: any = tableInstance;

  const pages = Array.from(Array(pageCount).keys());

  return (
    <>
      <TableWrapper>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-2xl text-primary font-acto">Cargando...</p>
          </div>
        ) : (
          <>
            <div className="m-4">
              <input
                type="text"
                placeholder="Buscar"
                className="border border-gray-300 rounded-md px-2 py-2 w-full"
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>
            <div className="table-scroll-container">
              {' '}
              {/* Scroll Container */}
              <table className="table-fixed border-collapse w-full">
                <thead
                  style={{
                    borderBottom: `2px solid #F0F0F0`,
                    backgroundColor: '#fff',
                    position: 'sticky',
                    top: '0',
                  }}
                >
                  {headerGroups.map((headerGroup: any, index: any) => (
                    <tr
                      {...headerGroup.getHeaderGroupProps()}
                      style={{
                        display: 'flex',
                        paddingLeft: '1rem',
                        paddingRight: '1rem',
                      }}
                      key={index}
                    >
                      {headerGroup.headers.map((column: any, index: any) => {
                        return (
                          <TableH
                            style={{
                              width: column.width || '100%',
                              cursor: column.canFilter ? 'pointer' : 'default',
                            }}
                            className="text-left pb-1 pr-2"
                            key={index}
                          >
                            <HeaderWrapper>
                              <p className="text-lg text-primary font-acto">
                                {column.render('Header')}
                              </p>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <DownArrow className={'ml-2'} />
                                ) : (
                                  <UpArrow className={'ml-2'} />
                                )
                              ) : (
                                ''
                              )}
                            </HeaderWrapper>
                          </TableH>
                        );
                      })}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  style={{
                    maxHeight: '60vh',
                    display: 'block',
                    // transform: "translate(0,0)",
                  }}
                >
                  {page.map((row: any) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        style={{
                          display: 'flex',
                          borderBottom: `2px solid #F0F0F0`,
                          paddingLeft: '1rem',
                          paddingRight: '1rem',
                          height: 'fit-content',
                        }}
                        key={row.id}
                      >
                        {row.cells.map((cell: any, index: any) => {
                          const RenderedCell = cell.render('Cell');
                          return CUSTOM_RENDER_COLUMNS.includes(
                            cell.column.Header
                          ) ? (
                            <TableData
                              key={index}
                              data-label={cell.column.Header}
                              style={{
                                width: cell.column.width || '100%', // Provide a fallback if width is not set
                                paddingRight: '1rem',
                              }}
                              className="h-20 flex items-center justify-center"
                            >
                              {RenderedCell}
                            </TableData>
                          ) : (
                            <TableData
                              key={index}
                              data-label={cell.column.Header}
                              style={{
                                width: cell.column.width || '100%', // Provide a fallback if width is not set
                              }}
                            >
                              {RenderedCell}
                            </TableData>
                          );
                        })}
                      </tr>
                    );
                  })}
                  {data.length === 0 && (
                    <tr
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderBottom: `2px solid #F0F0F0`,
                        paddingLeft: '1rem',
                        paddingRight: '1rem',
                      }}
                    >
                      <td
                        colSpan={columns.length}
                        style={{
                          textAlign: 'center',
                          paddingTop: '1rem',
                          paddingBottom: '1rem',
                        }}
                      >
                        No se encontraron resultados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </TableWrapper>
      {pages.length > 0 ? (
        <div className="flex sm:flex-row flex-col justify-between sm:items-center items-end mt-4 gap-4">
          <div>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
              className="rounded-md px-2 py-2 w-24 cursor-pointer"
            >
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Ver {pageSize}
                </option>
              ))}
            </select>
          </div>
          <Pagination
            pages={pages}
            pageCount={pageCount}
            pageSize={pageSize}
            nextPage={nextPage}
            prevPage={previousPage}
            index={state.pageIndex}
            gotoPage={gotoPage}
          />
        </div>
      ) : null}
    </>
  );
};
