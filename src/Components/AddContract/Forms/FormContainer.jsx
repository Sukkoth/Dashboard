import BackEndError from '../Alerts/BackEndError';
import NewContractAdded from '../Alerts/NewContractAdded';
import BranchInfo from './BranchInfo';
import ContractDetails from './ContractDetails';
import ContractDuration from './ContractDuration';
import ContractReason from './ContractReason';
import SubmitButton from './SubmitButton';

const FormContainer = ({
    handleSubmit,
    onSubmitHandler,
    backEndError,
    register,
    isLoading,
    errors,
    contractData,
}) => {
    return (
        <div className='container-fluid pt-4 px-4'>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className='row g-4'>
                    <BranchInfo register={register} errors={errors} />
                    <ContractDetails register={register} errors={errors} />
                    <ContractDuration register={register} errors={errors} />
                    <ContractReason register={register} errors={errors} />
                    {!isLoading && backEndError?.message && (
                        <BackEndError message={backEndError?.message} />
                    )}
                    {!isLoading && contractData?.id && <NewContractAdded />}
                    <SubmitButton
                        // handleSubmit={handleSubmit}
                        // onSubmitHandler={onSubmitHandler}
                        isLoading={isLoading}
                    />
                </div>
            </form>
        </div>
    );
};

export default FormContainer;
