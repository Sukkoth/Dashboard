import PropTypes from 'prop-types';

function FormContainer({ children }) {
    return <div className='container-fluid pt-4 px-4'>{children}</div>;
}

FormContainer.propTypes = {
    children: PropTypes.object,
};

export default FormContainer;
