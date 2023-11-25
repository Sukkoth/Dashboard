import { Table } from 'rsuite';
const { Cell } = Table;

const BranchCell = ({ rowData, dataKey, ...props }) => (
    <Cell {...props}>{rowData[dataKey]}</Cell>
);

export default BranchCell;
