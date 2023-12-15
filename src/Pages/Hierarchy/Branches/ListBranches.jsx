import useApiFetch from '../../../API/useApiFetch';
import FullLoader from '../../../Components/Loaders/FullLoader';
import LargeAlert from '../../../Components/ListContracts/Alerts/LargeAlert';
import ListComponent from '../../../Components/Hierarchy/Branches/ListBranches';

const ListBranches = () => {
    const {
        data: branchData,
        isLoading,
        errors,
        fetchData,
    } = useApiFetch({
        url: '/branch/getAllBranches',
        method: 'get',
        params: {
            page: 1,
            size: 25,
        },
    });

    return (
        <>
            <FullLoader isLoading={isLoading} />
            {!isLoading && !errors?.message && (
                <>
                    {/* <ConfirmationModal tobeDeleted={tobeDeleted} /> */}
                    <div className='container-fluid take-screen p-3 pb-3'>
                        <ListComponent
                            branchData={branchData}
                            fetchData={fetchData}
                        />
                    </div>
                </>
            )}
            <LargeAlert isLoading={isLoading} message={errors?.message} />
        </>
    );
};

export default ListBranches;
