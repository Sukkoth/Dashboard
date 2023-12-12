import { useState } from 'react';
import PropTypes from 'prop-types';

function Alert({ message }) {
    const [show, setShow] = useState(true);
    return (
        show && (
            <div
                className='mb-4 alert alert-warning fade show'
                role='alert'
                style={{ position: 'relative' }}
            >
                {message}
                <button
                    type='button'
                    className='btn-close'
                    style={{ position: 'absolute', right: '2rem' }}
                    onClick={() => setShow(false)}
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
