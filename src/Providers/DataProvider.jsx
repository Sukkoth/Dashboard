import { createContext } from 'react';
import useApiFetch from '../API/useApiFetch';

export const DataContext = createContext({});

const DataProvider = ({ children }) => {
    const { data: regionsData } = useApiFetch(
        { url: '/leases/hierarchy' },
        true
    );

    const findBranchInfo = (branchId) => {
        if (!regionsData?.length) return {};
        for (const region of regionsData) {
            for (const district of region.districts) {
                const branch = district.branches.find(
                    (b) => b.BranchId === branchId
                );
                if (branch) {
                    return {
                        region: region.region.trim(),
                        regionId: region.regionId,
                        district: district.name.trim(),
                        districtId: district.districtId,
                        branch: branch.name.trim(),
                        branchId: branch.BranchId,
                        branchCode: branch.branchCode.trim(),
                    };
                }
            }
        }
        // If the branchId is not found
        return null;
    };

    const branches = regionsData?.flatMap((region) =>
        region.districts.flatMap((district) => district.branches)
    );

    return (
        <DataContext.Provider
            value={{
                regionsData: regionsData,
                branches,
                findBranchInfo,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
