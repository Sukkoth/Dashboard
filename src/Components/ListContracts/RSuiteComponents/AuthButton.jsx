import React from 'react';
import { Table } from 'rsuite';

const { Cell } = Table;
const AuthButton = ({ rowData, dataKey, ...props }) => (
    <Cell
        {...props}
        style={{
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <button
            className={`btn ${
                rowData[dataKey]
                    ? 'btn-outline-primary m-2'
                    : 'btn-outline-danger m-2'
            }`}
        >
            {rowData[dataKey] ? 'A' : 'U'}
        </button>
    </Cell>
);

export default AuthButton;
