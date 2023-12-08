import { createContext } from 'react';
import useApiFetch from '../API/useApiFetch';
import { useParams } from 'react-router-dom';

export const UpdateContext = createContext({});

const UpdateProvider = ({ children }) => {
    const { contractId } = useParams();

    const {
        data: contractData,
        isLoading: contractLoading,
        errors: backEndError,
        fetchData,
    } = useApiFetch({
        url: `/leases/${contractId}`,
        method: 'GET',
    });

    return (
        <UpdateContext.Provider
            value={{
                contractData,
                contractLoading,
                backEndError,
                fetchData,
            }}
        >
            {children}
        </UpdateContext.Provider>
    );
};

export default UpdateProvider;
