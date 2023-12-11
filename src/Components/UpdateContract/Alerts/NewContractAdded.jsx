const NewContractAdded = ({ text }) => {
    return (
        <div className='d-flex justify-content-center'>
            <div className='alert alert-primary' role='alert'>
                {text || 'A new Contract has been added, redirecting . . .'}
            </div>
        </div>
    );
};

export default NewContractAdded;
