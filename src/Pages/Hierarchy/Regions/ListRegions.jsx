import useApiFetch from '../../../API/useApiFetch';
import FullLoader from '../../../Components/Loaders/FullLoader';
import LargeAlert from '../../../Components/ListContracts/Alerts/LargeAlert';
import ListComponent from '../../../Components/Hierarchy/Regions/ListRegions';

const ListRegions = () => {
    const {
        data: regionsData,
        isLoading,
        errors,
        fetchData,
    } = useApiFetch({
        url: 'region/getAllRegions',
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
                            regionsData={regionsData}
                            fetchData={fetchData}
                        />
                    </div>
                </>
            )}
            <LargeAlert isLoading={isLoading} message={errors?.message} />
        </>
    );
};

export default ListRegions;
