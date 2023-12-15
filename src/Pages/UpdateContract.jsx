import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DataContext } from '../Providers/DataProvider';

import contractSchema from '../yupSchemas/contractSchema';
import useApiFetch from '../API/useApiFetch';
import FormContainer from '../Components/UpdateContract/Forms/FormContainer';
import SubmitButton from '../Components/UpdateContract/Forms/SubmitButton';
import NewContractAdded from '../Components/UpdateContract/Alerts/NewContractAdded';
import BackEndError from '../Components/UpdateContract/Alerts/BackEndError';
import ContractReason from '../Components/UpdateContract/Forms/ContractReason';
import InstallmentData from '../Components/UpdateContract/Forms/InstallmentData';
import ContractDuration from '../Components/UpdateContract/Forms/ContractDuration';
import ContractDetails from '../Components/UpdateContract/Forms/ContractDetails';
import BranchInfo from '../Components/UpdateContract/Forms/BranchInfo';
import { UpdateContext } from '../Providers/UpdateProvider';

const UpdateContract = () => {
    const navigate = useNavigate();
    const { regionsData } = useContext(DataContext);
    const {
        contractData,
        isLoading,
        error: backEndError,

        updatedData,
        isUpdating,
        updatingError,
        updateContract,
    } = useContext(UpdateContext);
    const [installmentData, setInstallmentData] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        control,
    } = useForm({
        resolver: yupResolver(contractSchema),
    });

    //watch for fileName change
    useWatch({
        name: 'fileName', // Replace with your actual field name
        defaultValue: contractData?.fileName,
        control,
    });

    /**
     * @desc Send the request the save lease information
     * @param {*} data - this comes from formHandler. It is information of the lease
     */
    const onSubmitHandler = async (data) => {
        //the backend requires the installement data to be formatted into stringfied JSON
        let formattedInstallmentData = installmentData?.reduce((acc, data) => {
            acc[`${data.installmentDate}`] = Number(data.amount);
            return acc;
        }, {});

        formattedInstallmentData =
            installmentData?.length > 0
                ? JSON.stringify(formattedInstallmentData)?.replace(/\\/g, '')
                : null;

        delete data['region'];
        delete data['district'];
        delete data['branchName'];
        data['branch'] = {
            branchId: Number(data.branchId),
        };

        await updateContract({
            data: {
                ...data,
                installmentDetails: formattedInstallmentData,
            },
        });
    };

    useEffect(() => {
        if (contractData?.id) {
            reset(contractData);
        }
        return () => {
            reset();
        };
    }, [reset, contractData?.id]);

    useEffect(() => {
        if (!isUpdating && updatedData?.id) {
            reset();
            setTimeout(() => {
                navigate(`/leases/${updatedData?.id}`);
            }, 1500);
        }
    }, [updatedData, isUpdating, navigate, reset]);

    return (
        <FormContainer>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className='row g-4'>
                    <BranchInfo register={register} errors={errors} />
                    <ContractDetails register={register} errors={errors} />
                    <ContractDuration
                        register={register}
                        errors={errors}
                        control={control}
                    />
                    <InstallmentData
                        installmentData={installmentData}
                        setInstallmentData={setInstallmentData}
                    />
                    <ContractReason
                        register={register}
                        errors={errors}
                        setValue={setValue}
                    />
                    {(!isLoading || !isUpdating) && backEndError?.message && (
                        <BackEndError message={backEndError?.message} />
                    )}
                    {!isUpdating && updatedData?.id && (
                        <NewContractAdded text='Contract Updated !!! ' />
                    )}
                    <SubmitButton
                        handleSubmit={handleSubmit}
                        onSubmitHandler={onSubmitHandler}
                        isLoading={isLoading || isUpdating}
                        text='Update Contract'
                    />
                </div>
            </form>
        </FormContainer>
    );
};

export default UpdateContract;
