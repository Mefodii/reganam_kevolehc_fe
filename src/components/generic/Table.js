import React from "react";
import { useTable, useSortBy } from "react-table";

import SVGArrow from "./svg/SVGArrow";

export const sortBoolean = (rowA, rowB, columnId, desc) => {
  const a = rowA.original[columnId];
  const b = rowB.original[columnId];

  if (a === b) return 0;
  if (a) return 1;
  return -1;
};

const Table = ({ columns, data, extraClasses = {} }) => {
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  const {
    containerXC,
    tableXC,
    headXC,
    headRowXC,
    headCellXC,
    bodyXC,
    rowXC,
    cellXC,
  } = extraClasses;

  return (
    <div className={`${containerXC}`}>
      <table className={`table-generic ${tableXC}`} {...getTableProps()}>
        <thead className={`${headXC}`}>
          {headerGroups.map((headerGroup) => (
            <tr
              className={`table-header-row ${headRowXC}`}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column, j) => {
                return (
                  <th
                    className={`table-cell-header text-left relative ${headCellXC}`}
                    key={j}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <SVGArrow
                      className={`absolute right-2 top-1/3 ml-2 w-3 ${
                        column.isSorted ? "" : "hidden"
                      } transform ${
                        column.isSortedDesc ? "-rotate-90" : "rotate-90"
                      }`}
                    ></SVGArrow>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className={`${bodyXC}`} {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                key={i}
                className={`table-row group ${rowXC}`}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      className={`table-cell-string table-cell-border ${cellXC}`}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
