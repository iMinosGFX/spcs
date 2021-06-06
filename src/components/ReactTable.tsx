import React from 'react'
import {useSortBy} from 'react-table'
import { useTable, useFilters, useGlobalFilter, usePagination } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown,faCaretUp } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import matchSorter from 'match-sorter'

// Define a default UI for filtering
function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length
  
    return (
      <input type="text"
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
    //@ts-ignore
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

const Pagination = styled.div`
 height: 50px;
 margin:5px 10px;
`
const PaginationLeft = styled.div`
  width: max-content;
  float:left;
  line-height:50px;
`
const PaginationRight = styled.div`
  width: max-content;
  float:right;
`

function Table({ columns, data }) {

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      rows,
      state,
      visibleColumns,
      preGlobalFilteredRows,
      setGlobalFilter,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state:{pageIndex, pageSize}
    } = useTable(
      {
        columns,
        data,
        defaultColumn, // Be sure to pass the defaultColumn option
        filterTypes,
        initialState: { pageIndex: 0 },
      },
      useFilters,
      useGlobalFilter,
      useSortBy,
      usePagination
    )

    const firstPageRows = rows.slice(0, 10)

    return(
      <>
      <table {...getTableProps()} className="table no-border">
        <thead className="no-border">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? <FontAwesomeIcon icon={faCaretDown} size="lg"/>
                          : <FontAwesomeIcon icon={faCaretUp} size="lg"/>
                        : ''}
                    </span>
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="no-border">
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
        <div>{rows.length} lignes affichées</div>
      <Pagination>
        <PaginationLeft>
          <button className={`btn btn-sm align ${!canPreviousPage ? 'dark' : 'bg-purple light'}`} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button className={`btn btn-sm align ${!canPreviousPage ? 'dark' : 'bg-purple light'}`} onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button className={`btn btn-sm align ${!canNextPage ? 'dark' : 'bg-purple light'}`} onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button className={`btn btn-sm align ${!canNextPage ? 'dark' : 'bg-purple light'}`} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
          <span className="text-center">
            Page{' '}
            <strong>
              {pageIndex + 1} sur {pageOptions.length}
            </strong>{' '}
          </span>
        </PaginationLeft>
        <PaginationRight>
        <span className="align">
          Allez à la page :{' '}
          <input
            type="number"
            value={pageIndex+1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px', background: "none", borderBottom: "1px solid #c8c8c8" }}
            min={1}
            max={pageOptions.length}
            className="align"
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
          className="align"
          style={{background: "none"}}
        >
          {[5, 10, 15, 20].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Voir {pageSize}
            </option>
          ))}
        </select>
        </PaginationRight>
      </Pagination>
    </>
    )
}

export default Table