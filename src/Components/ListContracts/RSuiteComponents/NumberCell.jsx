import numeral from 'numeral';
import { Table } from 'rsuite';

const { Cell } = Table;
const NumberCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props}>{numeral(rowData[dataKey]).format('0,0.00')}</Cell>
);

export default NumberCell;
