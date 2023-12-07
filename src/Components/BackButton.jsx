import { useNavigate } from 'react-router-dom';

function BackButton({ onClick, back }) {
    const navigate = useNavigate();
    return (
        <button
            type='button'
            className='btn btn-warning text-light'
            style={{
                marginLeft: '2rem',
                position: 'absolute',
                top: '4rem',
                left: '2rem',
                width: '6rem',
            }}
            onClick={back ? () => navigate(-1) : onClick}
        >
            <i className='fa fa-chevron-left alt'></i> Back
        </button>
    );
}

export default BackButton;
