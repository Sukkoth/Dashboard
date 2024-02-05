import { utils, writeFile } from 'xlsx';

import { MONTHS_IN_YEAR } from './constants';

export const EXPORT_TO_EXCEL = async (selectedMonth, selectedYear) => {
  // Select the HTML table
  const table_elt = document.getElementById('myTable');

  // Create a new workbook
  const wb = utils.book_new();

  // Create a new worksheet
  const ws = utils.aoa_to_sheet([[]]);

  // Set the worksheet name
  ws['!ref'] = 'A1:D'; // Adjust this to match the number of rows and columns in your table

  // Iterate through the table rows
  const rows = table_elt.rows;
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].cells;
    const rowData = [];
    for (let j = 0; j < cells.length; j++) {
      const cellValue = cells[j].innerText;
      rowData.push(
        j <= 7
          ? { t: 's', v: cellValue, z: '@' }
          : j === 8
          ? { t: 'n', v: cellValue, numFmt: '0.00' }
          : cellValue
      );
    }
    utils.sheet_add_aoa(ws, [rowData], { origin: -1 });
  }

  //This defines the length of each column
  ws['!cols'] = [
    { wch: 5 },
    { wch: 5 },
    { wch: 5 },
    { wch: 8 },
    { wch: 8 },
    { wch: 8 },
    { wch: 8 },
    { wch: 8 },
    { wch: 15 },
    { wch: 20 },
    { wch: 100 },
  ];
  // Add the worksheet to the workbook
  utils.book_append_sheet(wb, ws, 'Sheet 1');

  // Write the workbook to an XLSX file
  writeFile(
    wb,
    `${
      MONTHS_IN_YEAR[selectedMonth - 1]
    } ${selectedYear} All In One For Upload.xlsx`
  );
};
