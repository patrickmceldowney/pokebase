'use client';

import { Column, Row, TableData } from '@/types/table';
import { useEffect, useState } from 'react';
import {
  filterBySearch,
  generatePageNumbers,
  sortRows,
} from './utils/tableFns';
import { deepClone, getNestedField } from '@/utils';
import EmptyState from '../EmptyState';
import { formatters } from './utils/formatters';
import SetEntity from './_components/SetEntity';
import Image from 'next/image';
import Footer from '../Footer';

export default function Table({ tableData }: { tableData: TableData }) {
  const MAX_PAGES_TO_SHOW = 4;
  const PAGINATION_OPTIONS = [10, 25, 50, 100, 0]; // 0 is ALL

  // states
  const [searchValue, setSearch] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState({ col: '', asc: true });
  const [rowResults, setRowResults] = useState<Row[]>([]);
  const [paginatedRows, setPaginatedRows] = useState<Row[]>([]);
  const [selectedRows, setSelectedRows] = useState<Row[]>([]);
  const [filteredTableRows, setFilteredTableRows] = useState<Row[]>(() =>
    deepClone(tableData.rows)
  );
  const [bulkSelect, setBulkSelect] = useState(false);
  const [paginationStart, setPaginationStart] = useState(1);
  const [paginationEnd, setPaginationEnd] = useState(1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([1]);

  // filter table rows
  useEffect(() => {
    const filteredRows = filterBySearch(
      searchValue,
      filteredTableRows,
      tableData.options
    );
    const sortedRows = sortRows(filteredRows, sortBy);
    setRowResults(sortedRows);
  }, [searchValue, filteredTableRows, sortBy, tableData.options]);

  // set total pages
  useEffect(() => {
    setTotalPages(
      rowsPerPage ? Math.ceil(tableData.totalItems / rowsPerPage) : 1
    );
  }, [rowsPerPage, tableData.totalItems]);

  // reset current page
  // useEffect(() => {
  //   if (totalPages < 2) {
  //     setCurrentPage(1);
  //   }
  // }, [totalPages]);

  // set pagination
  useEffect(() => {
    setPaginationStart((currentPage - 1) * rowsPerPage + 1);
    setPaginationEnd(
      rowsPerPage
        ? Math.min(currentPage * rowsPerPage, tableData.totalItems)
        : tableData.totalItems
    );
  }, [currentPage, rowsPerPage, tableData.totalItems]);

  // generate page numbers
  useEffect(() => {
    setPageNumbers(
      generatePageNumbers(currentPage, totalPages, MAX_PAGES_TO_SHOW)
    );
  }, [currentPage, totalPages]);

  function getSortFieldKey(column: Column) {
    return column.sortField ?? column.key;
  }

  async function getData() {
    try {
      console.log(currentPage);
      const res = await fetch(
        `/api/pokemon/cards?limit=${rowsPerPage}&page=${currentPage}`
      );
      const { data } = await res.json();
      console.log('data', data);
      setFilteredTableRows(data);
    } catch (e) {
      console.error('Error getting table data', e);
    }
  }

  return (
    <>
      <div className='flex-grow overflow-auto scrollbar-thin'>
        {/* handle filters */}
        {(tableData?.filters?.length || tableData?.options?.search) && (
          <div className='flex justify-between sticky top-0 bg-neutral-whisper z-10'>
            {tableData?.options?.search && <p>Search</p>}
            {/* TODO: filters */}
            {(() => {
              return 'filters';
            })()}
          </div>
        )}
        {rowResults.length > 0 ? (
          <div className='overflow-y-auto scrollbar-thin'>
            <table className='table-auto w-full text-base text-left text-gray-950 border-collapse scrollbar-thin'>
              <thead className='text-sm text-neutral-grey bg-white'>
                <tr>
                  {/* TODO: handle bulk select on change */}
                  {tableData?.options?.bulkSelect && (
                    <th className='checkbox-wrapper px-6 py-4'>
                      <input
                        type='checkbox'
                        className='checkbox'
                        checked={bulkSelect}
                      />
                    </th>
                  )}

                  {tableData.columns.map((col) => (
                    <th
                      scope='col'
                      className='p-3 text-sm font-normal border border-whisper'
                      key={col.key}
                    >
                      <span className='flex items-center gap-3'>
                        {col.title}
                        {col?.sortable && (
                          <button
                            className='w-4 h-4 cursor-pointer outline-none border-none text-neutral-grey text-[13px] flex items-center-justify-center'
                            onClick={() => {
                              const colKey = getSortFieldKey(col);
                              if (sortBy.col === colKey) {
                                setSortBy((prev) => {
                                  return { ...prev, asc: !prev.asc };
                                });
                              } else {
                                setSortBy({
                                  col: colKey,
                                  asc: true,
                                });
                              }
                            }}
                          >
                            <i className='fa-solid fa-sort'></i>
                          </button>
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rowResults.map((row, i) => (
                  <tr
                    key={i}
                    className={`relative ${
                      i % 2 !== 0 ? 'bg-white' : 'bg-[#f7f7f8b2]'
                    }`}
                  >
                    {/* TODO: handle bulk select (bind group) */}
                    {tableData?.options?.bulkSelect && (
                      <td className='checkbox-wrapper px-6 py-4'>
                        <input
                          type='checkbox'
                          className='checkbox'
                          name='selectRow'
                          id='selectRow'
                          value={String(
                            row[tableData.options.bulkSelectKey || '_id']
                          )}
                        />
                      </td>
                    )}
                    {tableData.columns.map((col) => {
                      const value = String(getNestedField(row, col.key)) || '-';
                      return (
                        <td
                          className='border border-neutral-whisper p-3'
                          key={col.key}
                        >
                          {(() => {
                            if (col.component === 'link') {
                              return (
                                <a
                                  className='cursor-pointer hover:text-purple-600'
                                  href={col?.componentOptions?.href}
                                >
                                  {col.format
                                    ? formatters[col.format](value)
                                    : value}
                                </a>
                              );
                            } else if (col.component === 'set') {
                              return <SetEntity row={row} column={col} />;
                            } else if (col.component === 'image') {
                              return (
                                <Image
                                  src={col.componentOptions?.src || value || ''}
                                  width={
                                    col.componentOptions?.size?.width || 128
                                  }
                                  height={
                                    col.componentOptions?.size?.height || 128
                                  }
                                  alt={col.componentOptions?.alt || ''}
                                />
                              );
                            } else {
                              return col?.format
                                ? formatters[col.format](value)
                                : value;
                            }
                          })()}
                        </td>
                      );
                    })}
                    {/* TODO: row actions */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title='No data found...'
            subtitle="We couldn't find any pokemon matching your search criteria. Please clear your search and try again"
            icon='fa-regular fa-magnifying-glass'
          />
        )}
      </div>
      {tableData?.options?.pagination && (
        <Footer>
          <p className='flex-1'>
            Results
            {paginationStart}-{paginationEnd} of {tableData.totalItems}
          </p>
          <div className='flex items-center gap-6'>
            <button
              type='button'
              className='btn-icon-simple'
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage(currentPage - 1);
                getData();
              }}
            >
              <i className='fa-solid fa-chevron-left'></i>
            </button>
            <div className='flex items-center gap-0.5'>
              {pageNumbers.map((pageNumber) => (
                <>
                  {pageNumber === -1 ? (
                    <span className='text-neutral-grey'>...</span>
                  ) : (
                    <button
                      className={`page-number ${
                        currentPage === pageNumber ? 'selected' : ''
                      }`}
                      type='button'
                      onClick={() => {
                        setCurrentPage(pageNumber);
                        getData();
                      }}
                    >
                      {pageNumber}
                    </button>
                  )}
                </>
              ))}
            </div>
            <button
              onClick={() => {
                setCurrentPage(currentPage + 1);
                getData();
              }}
              className='btn-icon-simple'
              type='button'
              disabled={currentPage === totalPages}
            >
              <i className='fa-solid fa-chevron-right'></i>
            </button>
          </div>
          <div className='flex-1 flex items-center justify-end gap-2.5'>
            <p className='text-neutral-grey'>Rows per page</p>
          </div>
        </Footer>
      )}
    </>
  );
}
