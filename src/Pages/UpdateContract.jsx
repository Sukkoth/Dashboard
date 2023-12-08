import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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
        fetchData: makeRequest,
    } = useContext(UpdateContext);
    const [installmentData, setInstallmentData] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(contractSchema),
    });

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
        console.log('SCREAM', {
            ...data,
            ...updatedLocation,
            installmentDetails: formattedInstallmentData,
        });
        // await makeRequest({
        //     data: {
        //         ...data,
        //         ...updatedLocation,
        //         installmentDetails: formattedInstallmentData,
        //     },
        // });
    };

    useEffect(() => {
        if (contractData?.id) {
            reset(contractData);
        }
    }, [reset, contractData?.id]);

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
                    {/* {!isLoading && contractData?.id && <NewContractAdded />} */}
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

export default UpdateContract;
