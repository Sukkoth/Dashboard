import { Link } from 'react-router-dom';
import { Table } from 'rsuite';

const { Cell } = Table;

const ActionCell = ({ rowData, dataKey, text, link, type, ...props }) => (
    <Cell
        {...props}
        style={{
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <Link
            className={`btn btn-${type || 'primary m-2'}`}
            to={`/${link}/${rowData[dataKey]}`}
        >
            {text}
        </Link>
    </Cell>
);

export default ActionCell;
