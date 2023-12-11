const SubmitButton = ({ isLoading, text }) => {
    return (
        <div className='col-12  d-flex justify-content-center'>
            <button className='btn btn-primary w-25 mb-5 p-3' type='submit'>
                {isLoading ? 'Loading' : text ? text : 'Add Contract'}
            </button>
        </div>
    );
};

export default SubmitButton;
