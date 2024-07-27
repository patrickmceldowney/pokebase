import { Row, TableOptions } from '@/types/table';

export function filterBySearch(
  searchValue: string,
  filteredRows: Row[],
  tableOptions?: TableOptions
) {
  const search = tableOptions?.search;
  if (!search || searchValue.length <= 2) return filteredRows;

  return filteredRows.filter((row) => {
    return search.searchKeys.some((key) => {
      const rowVal = row[key];
      if (typeof rowVal === 'string') {
        return rowVal.toLowerCase().includes(searchValue.toLowerCase());
      }

      return false;
    });
  });
}

export function sortRows(rows: Row[], sortBy: { col: string; asc?: boolean }) {
  let sortModifier = sortBy.asc ? 1 : -1;
  return rows.sort((a, b) => {
    const aVal = a[sortBy.col];
    const bVal = b[sortBy.col];

    if (aVal === null || bVal === null) {
      return 0;
    }

    let comparison = 0;
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      comparison = aVal - bVal;
    } else if (typeof aVal === 'string' && typeof bVal === 'string') {
      comparison = aVal.localeCompare(bVal);
    } else if (typeof aVal === 'boolean' && typeof bVal === 'boolean') {
      comparison = aVal === bVal ? 0 : aVal ? -1 : 1;
    } else if (aVal instanceof Date && bVal instanceof Date) {
      comparison = aVal.getTime() - bVal.getTime();
    }

    return comparison * sortModifier;
  });
}

/**
 * Generate page numbers to show on table.
 * We are only showing 6 page numbers at a time along with the last page.
 * Pass -1 to show an ellipsis
 * @param currentPage
 * @param totalPages
 */

export function generatePageNumbers(
  currentPage: number,
  totalPages: number,
  maxPageNumbers: number
) {
  const pages = [];
  let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers) / 2);
  let endPage = Math.min(totalPages, startPage - maxPageNumbers - 1);

  if (endPage - startPage < maxPageNumbers - 1) {
    startPage = Math.max(1, endPage - maxPageNumbers + 1);
  }

  // always show page 1
  if (startPage > 1) {
    pages.push(1);
  }

  // if page is greater than 2, show an ellipsis before page 1
  if (startPage > 2) {
    pages.push(-1);
  }

  for (let i = startPage; i < endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages) {
    pages.push(-1);
    pages.push(totalPages);
  }

  return pages;
}
