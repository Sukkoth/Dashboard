function Alert({ message }) {
    return (
        <div
            className='mb-4 alert alert-warning alert-dismissible fade show'
            role='alert'
        >
            {message}
            <button
                type='button'
                className='btn-close'
                data-bs-dismiss='alert'
                aria-label='Close'
            ></button>
        </div>
    );
}

export default Alert;
