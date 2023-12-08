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
    } = useApiFetch({
        url: `/leases/${contractId}`,
        method: 'GET',
    });

    return (
        <UpdateContext.Provider
            value={{
                contractData: contractData?.id
                    ? contractData
                    : {
                          discountRate: 0.02152,
                          branchId: 26,
                          leaseIncentive: 32.0,
                          contractStartDate: '2008-12-05',
                          contractType: null,
                          contractEndDate: '2019-09-15',
                          branchName: 'Koka Branch',
                          installmentDetails: null,
                          contractRegisteredDate: '2023-12-07',
                          authorization: true,
                          totalPayment: 16.0,
                          numberOfInstallments: 0,
                          advancePayment: 61.0,
                          id: 3,
                          initialDirectCost: 2.0,
                      },
                contractLoading,
                backEndError,
            }}
        >
            {children}
        </UpdateContext.Provider>
    );
};

export default UpdateProvider;
