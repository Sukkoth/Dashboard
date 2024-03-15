import { Link } from 'react-router-dom';
import SIDEBAR_ICONS from './icons';

function Header() {
  return (
    <>
      <Link to='/' className='navbar-brand mx-4 mb-3'>
        <h1
          className='h1 text-header icon-pink text-lg'
          style={{ fontWeight: 'bolder' }}
        >
          <i
            className='fa fa-hashtag me-2 text-secondary'
            style={{ fontSize: '2.5rem' }}
          ></i>
          CBELM
        </h1>
      </Link>

      <div className='d-flex align-items-center ms-4 mb-4'>
        <div className='position-relative' style={{ objectFit: 'contain' }}>
          <img
            className='rounded-circle'
            src={SIDEBAR_ICONS.AVATAR}
            style={{
              width: '40px',
              height: '40px',
            }}
          />
          <div className='bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1'></div>
        </div>
        <div className='ms-3'>
          <h6 className='mb-0'>Finance Head</h6>
          <span>Admin</span>
        </div>
      </div>
    </>
  );
}

export default Header;
