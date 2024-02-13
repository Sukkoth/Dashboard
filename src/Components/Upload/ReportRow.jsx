import PropTypes from 'prop-types';

import { MONTHS_IN_YEAR } from '../../utils/constants';
import numeral from 'numeral';

function ReportRow({ row, selectedMonth, selectedYear, type }) {
  return (
    <tr>
      <td>01</td>
      <td>{row?.branch?.location}</td>
      <td>{row?.branch?.costCenter}</td>
      <td>{type === 'ammortization' ? '561083' : '511025'}</td>
      <td>00000</td>
      <td>00000</td>
      <td>00000</td>
      <td>00000</td>
      <td>
        {numeral(
          type === 'ammortization' ? row?.interestExpence : row?.deprecationExp
        ).format('0,0.00')}
      </td>
      <td>-</td>
      <td>
        {row?.branch?.name} for ({row?.type}) Depr. Expense-{' '}
        {type === 'ammortization'
          ? ' Finance charge lease '
          : 'Right of Use Asset'}
        for the month of {MONTHS_IN_YEAR[selectedMonth - 1]} {selectedYear}
      </td>
    </tr>
  );
}

ReportRow.propTypes = {
  row: PropTypes.object,
  selectedMonth: PropTypes.number,
  selectedYear: PropTypes.number,
  type: PropTypes.string,
};

export default ReportRow;
