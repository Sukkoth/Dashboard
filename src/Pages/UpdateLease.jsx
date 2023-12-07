import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DataContext } from '../Providers/DataProvider';

import contractSchema from '../yupSchemas/contractSchema';
import useApiFetch from '../API/useApiFetch';
import FormContainer from '../Components/AddContract/Forms/FormContainer';
import SubmitButton from '../Components/AddContract/Forms/SubmitButton';
import NewContractAdded from '../Components/AddContract/Alerts/NewContractAdded';
import BackEndError from '../Components/AddContract/Alerts/BackEndError';
import ContractReason from '../Components/AddContract/Forms/ContractReason';
import InstallmentData from '../Components/AddContract/Forms/InstallmentData';
import ContractDuration from '../Components/AddContract/Forms/ContractDuration';
import ContractDetails from '../Components/AddContract/Forms/ContractDetails';
import BranchInfo from '../Components/AddContract/Forms/BranchInfo';

const UpdateLease = () => {
    const navigate = useNavigate();
    const { regionsData } = useContext(DataContext);
    const [installmentData, setInstallmentData] = useState([]);

    const sampleData = {
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
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(contractSchema),
        defaultValues: sampleData,
    });

    const {
        data: contractData,
        isLoading,
        errors: backEndError,
        fetchData: makeRequest,
    } = useApiFetch({ url: '/leases', method: 'POST' }, false);

    useEffect(() => {
        if (!isLoading && contractData?.id) {
            reset();
            setTimeout(() => {
                navigate(`/leases/${sampleData?.id}`);
            }, 1500);
        }
    }, [contractData, isLoading, navigate, reset]);

    /**
     * @desc Send the request the save lease information
     * @param {*} data - this comes from formHandler. It is information of the lease
     */
    const onSubmitHandler = async (data) => {
        const updatedLocation = {
            region: regionsData[data.region].region,
            district: regionsData[data.region].districts[data.district].name,
            branchName:
                regionsData[data.region].districts[data.district].branches[
                    data.district
                ].name,
            branch: {
                branchId:
                    regionsData[data.region].districts[data.district].branches[
                        data.district
                    ].BranchId,
            },
        };

        //the backend requires the installement data to be formatted into stringfied JSON
        let formattedInstallmentData = installmentData.reduce((acc, data) => {
            acc[`${data.installmentDate}`] = Number(data.amount);
            return acc;
        }, {});

        formattedInstallmentData =
            installmentData.length > 0
                ? JSON.stringify(formattedInstallmentData).replace(/\\/g, '')
                : null;

        await makeRequest({
            data: {
                ...data,
                ...updatedLocation,
                installmentDetails: formattedInstallmentData,
            },
        });
    };

    return (
        <FormContainer>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className='row g-4'>
                    <BranchInfo register={register} errors={errors} />
                    <ContractDetails register={register} errors={errors} />
                    <ContractDuration register={register} errors={errors} />
                    <InstallmentData
                        installmentData={installmentData}
                        setInstallmentData={setInstallmentData}
                    />
                    <ContractReason register={register} errors={errors} />
                    {!isLoading && backEndError?.message && (
                        <BackEndError message={backEndError?.message} />
                    )}
                    {!isLoading && contractData?.id && <NewContractAdded />}
                    <SubmitButton
                        handleSubmit={handleSubmit}
                        onSubmitHandler={onSubmitHandler}
                        isLoading={isLoading}
                    />
                </div>
            </form>
        </FormContainer>
    );
};

export default UpdateLease;
