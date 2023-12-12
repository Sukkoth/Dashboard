import { useEffect, useState } from 'react';
import useApiFetch from '../../API/useApiFetch';
import FullLoader from '../../Components/Loaders/FullLoader';
import LargeAlert from '../../Components/ListContracts/Alerts/LargeAlert';
import ConfirmationModal from '../../Components/ListContracts/ConfirmationModal';
import ContractsList from '../../Components/ListContracts/ContractsList';

const ListContracts = () => {
    const [tobeDeleted, setTobeDeleted] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const {
        data: contractsData,
        isLoading,
        errors,
        fetchData,
    } = useApiFetch({
        url: '/leases',
        method: 'get',
        params: {
            page: 1,
            size: 25,
        },
    });

    useEffect(() => {
        if (
            (startDate.length === 4 &&
                (endDate.length === 4 || endDate.length === 0)) ||
            (endDate.length === 4 &&
                (startDate.length === 4 || startDate.length === 0)) ||
            (startDate.length === 0 && endDate.length === 0)
        ) {
            fetchData({
                params: {
                    startYear: startDate,
                    endYear: endDate,
                    page: 1,
                    size: 25,
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate]);

    return (
        <>
            <FullLoader isLoading={isLoading} />
            {!isLoading && !errors?.message && (
                <>
                    {/* <ConfirmationModal tobeDeleted={tobeDeleted} /> */}
                    <div className='container-fluid take-screen p-3 pb-3'>
                        <form action=''>
                            <div className='row my-3 mx-2'>
                                <div className='col-2'>
                                    <label htmlFor='regionName mt-2'>
                                        Contract Registration Date
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        value={startDate}
                                        onChange={(e) =>
                                            setStartDate(e.target.value)
                                        }
                                    />
                                </div>
                                <div className='col-2'>
                                    <label htmlFor='regionName mt-2'>
                                        Contract End Date
                                    </label>
                                    <input
                                        type='text'
                                        className='form-control'
                                        value={endDate}
                                        onChange={(e) =>
                                            setEndDate(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </form>
                        <ContractsList
                            contractsData={contractsData}
                            setTobeDeleted={setTobeDeleted}
                            fetchData={fetchData}
                        />
                    </div>
                </>
            )}
            <LargeAlert isLoading={isLoading} message={errors?.message} />
        </>
    );
};

export default ListContracts;
