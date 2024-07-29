'use client';

import { Row, TableData } from '@/types/table';
import { useEffect, useState } from 'react';
import {
  filterBySearch,
  generatePageNumbers,
  sortRows,
} from './utils/tableFns';
import { deepClone } from '@/utils';
import EmptyState from '../EmptyState';
import { formatters } from './utils/formatters';
import SetEntity from './_components/SetEntity';
import Image from 'next/image';

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

  // get paginated results
  useEffect(() => {
    if (!tableData?.options?.pagination || !rowsPerPage) {
      setPaginatedRows(rowResults);
    } else {
      const cloned = deepClone(rowResults);
      const startIdx = (currentPage - 1) * rowsPerPage;
      const endIdx = Math.min(
        startIdx * rowsPerPage,
        (rowResults || []).length
      );
      setPaginatedRows(cloned.slice(startIdx, endIdx));
    }
  }, [rowResults, currentPage, rowsPerPage, tableData?.options?.pagination]);

  // set total pages
  useEffect(() => {
    setTotalPages(
      rowsPerPage ? Math.ceil((rowResults || []).length / rowsPerPage) : 1
    );
  }, [rowsPerPage, rowResults]);

  // reset current page
  useEffect(() => {
    if (totalPages < 2) {
      setCurrentPage(1);
    }
  }, [totalPages]);

  // set pagination
  useEffect(() => {
    setPaginationStart((currentPage - 1) * rowsPerPage + 1);
    setPaginationEnd(
      rowsPerPage
        ? Math.min(currentPage * rowsPerPage, (rowResults || []).length)
        : rowResults.length
    );
  }, [currentPage, rowsPerPage, rowResults]);

  // generate page numbers
  useEffect(() => {
    setPageNumbers(
      generatePageNumbers(currentPage, totalPages, MAX_PAGES_TO_SHOW)
    );
  }, [currentPage, totalPages]);

  return (
    <div
      className={`flex flex-col tw-gap-10 ${
        tableData?.options?.pagination ? 'pt-12 pb-32' : 'py-12'
      }`}
    >
      {/* handle filters */}
      {tableData?.filters?.length ||
        (tableData?.options?.search && (
          <div className='flex justify-between'>
            {tableData?.options?.search && <p>Search</p>}
            {/* TODO: filters */}
          </div>
        ))}
      {rowResults.length > 0 ? (
        <div className='overflow-x-auto max-h-screen'>
          <table className='table-auto w-full text-base text-left text-gray-950'>
            <thead className='text-sm text-gray-500 bg-white'>
              <tr>
                {/* TODO: bulk select */}
                {tableData.columns.map((col) => (
                  <th
                    scope='col'
                    className='p-3 text-sm font-normal'
                    key={col.key}
                  >
                    <span className='flex items-center gap-3'>
                      {col.title}
                      {/* TODO: sort column */}
                      {col?.sortable && (
                        <button
                          className='btn-icon btn-small'
                          onClick={() => {
                            setSortBy({
                              col: col?.sortField || col.key,
                              asc: !sortBy.asc,
                            });
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
              {paginatedRows.map((row, i) => (
                <tr
                  key={i}
                  className={`relative ${
                    i % 2 !== 0 ? 'bg-white' : 'bg-[#f7f7f8b2]'
                  }`}
                >
                  {/* TODO: bulk select */}
                  {tableData.columns.map((col) => (
                    <td className='px-6 py-4' key={col.key}>
                      {(() => {
                        if (col.component === 'link') {
                          return (
                            <a
                              className='cursor-pointer hover:text-purple-600'
                              href={col?.componentOptions?.href}
                            >
                              {col.format
                                ? formatters[col.format](String(row[col.key]))
                                : String(row[col.key])}
                            </a>
                          );
                        } else if (col.component === 'set') {
                          <SetEntity row={row} column={col} />;
                        } else if (col.component === 'image') {
                          <Image
                            src={
                              col.componentOptions?.src || String(row[col.key])
                            }
                            width={64}
                            height={64}
                            alt={col.componentOptions?.alt || ''}
                          />;
                        } else {
                          return col?.format
                            ? formatters[col.format](String(row[col.key]))
                            : String(row[col.key]);
                        }
                      })()}
                    </td>
                  ))}
                  {/* TODO: row actions */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
    // TODO: pagination
  );
}
