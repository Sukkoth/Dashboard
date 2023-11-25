import { createContext } from 'react';
import useApiFetch from '../API/useApiFetch';

export const DataContext = createContext({});

const DataProvider = ({ children }) => {
    const { data: regionsData } = useApiFetch(
        { url: '/leases/hierarchy' },
        true
    );

    const findBranchInfo = (branchId) => {
        for (const region of regionsData) {
            for (const district of region.districts) {
                const branch = district.branches.find(
                    (b) => b.BranchId === branchId
                );
                if (branch) {
                    return {
                        region: region.region.trim(),
                        district: district.name.trim(),
                        branch: branch.name.trim(),
                        branchCode: branch.branchCode.trim(),
                    };
                }
            }
        }

        // If the branchId is not found
        return null;
    };

    return (
        <DataContext.Provider
            value={{
                regionsData: regionsData || [],
                branches: regionsData.flatMap((region) =>
                    region.districts.flatMap((district) => district.branches)
                ),
                findBranchInfo,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
