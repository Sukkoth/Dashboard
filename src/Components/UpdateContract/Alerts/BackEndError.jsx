import PropTypes from 'prop-types';

const BackEndError = ({ message }) => {
  return (
    <div className='d-flex justify-content-center'>
      <div className='alert alert-warning w-25 text-center' role='alert'>
        <i className='fa fa-danger'></i>
        {message}
      </div>
    </div>
  );
};

BackEndError.propTypes = {
  message: PropTypes.string,
};

export default BackEndError;
