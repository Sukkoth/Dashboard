import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Alert({ message, action, link, type = 'warning' }) {
    const [show, setShow] = useState(true);
    const navigate = useNavigate();

    function handleClick() {
        if (action === 'redirect') {
            navigate(link);
        } else {
            setShow(false);
        }
    }
    return (
        show && (
            <div
                className={`mb-4 alert alert-${type} fade show d-flex justify-content-between`}
                role='alert'
            >
                {message}
                <button
                    type='button'
                    className='btn-close ms-5'
                    onClick={handleClick}
                    aria-label='Close'
                ></button>
            </div>
        )
    );
}

Alert.propTypes = {
    message: PropTypes.string,
};

export default Alert;
