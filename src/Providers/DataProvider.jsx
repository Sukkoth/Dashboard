import { createContext, useEffect, useState } from 'react';
// import regionsData from '../list.json';
import useApiFetch from '../API/useApiFetch';

export const DataContext = createContext({});

const DataProvider = ({ children }) => {
    const { data: regionsData } = useApiFetch(
        { url: '/leases/hierarchy' },
        true
    );

    return (
        <DataContext.Provider value={{ regionsData: regionsData || [] }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
