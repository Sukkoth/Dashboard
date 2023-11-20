import PropTypes from 'prop-types';

const NoContracts = ({ message }) => {
    return (
        <div className='container-fluid pt-4 px-4'>
            <div
                className='row bg-light rounded d-felx mx-0 text-center align-items-center'
                style={{ minHeight: '80vh' }}
            >
                <h3 className='justify-self-center'>
                    {message || 'No Contracts data found'}
                </h3>
            </div>
        </div>
    );
};

NoContracts.propTypes = {
    message: PropTypes.string,
};
export default NoContracts;
