import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import avatar from '../assets/icon.png';

import { LayoutContext } from '../Providers/LayoutProvider';

const SideBar = () => {
    const { sidebarToggle } = useContext(LayoutContext);
    return (
        <div
            className={`sidebar ${!sidebarToggle && 'open'} pe-4 pb-3`}
            style={{ backgroundColor: 'white' }}
        >
            <nav
                className='navbar navbar-dark'
                style={{ backgroundColor: 'white' }}
            >
                <Link to='/' className='navbar-brand mx-4 mb-3'>
                    <h1
                        className='h1 text-header text-lg'
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
                    <div
                        className='position-relative'
                        style={{ objectFit: 'contain' }}
                    >
                        <img
                            className='rounded-circle'
                            src={avatar}
                            alt=''
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
                <div className='navbar-nav w-100 mt-4'>
                    <NavLink to='/' className='nav-item nav-link'>
                        <i className='fa fa-tachometer-alt me-2'></i>
                        Dashboard
                    </NavLink>
                    <div className='nav-item dropdown'>
                        <Link
                            href='#'
                            className='nav-link dropdown-toggle'
                            data-bs-toggle='dropdown'
                        >
                            <i className='fa fa-laptop me-2'></i>Contracts
                        </Link>
                        <div className='dropdown-menu bg-transparent border-0'>
                            <NavLink
                                to='/add-contract'
                                className='dropdown-item mb-1 mx-4 '
                            >
                                <i className='fa fa-plus me-2 text-dark'></i>
                                Add
                            </NavLink>
                            <NavLink
                                to='/list-contracts/all'
                                className='dropdown-item mb-1 mx-4'
                            >
                                <i className='fa fa-list me-2 text-dark'></i>
                                List All
                            </NavLink>
                            <NavLink
                                to='/list-contracts/active'
                                className='dropdown-item mb-1 mx-4'
                            >
                                <i className='fas fa-file-contract me-2 text-dark'></i>
                                Active Contracts
                            </NavLink>
                            <NavLink
                                to='/list-contracts/ended'
                                className='dropdown-item mx-4'
                            >
                                <i className='fas fa-exclamation-circle me-2 text-dark'></i>
                                Ended Contracts
                            </NavLink>
                        </div>
                    </div>
                    {/* <NavLink
                        className='nav-item nav-link'
                        to={'/generate-report'}
                    >
                        <i className='fa fa-scroll me-2'></i>Generate Report
                    </NavLink> */}
                    <NavLink className='nav-item nav-link' to={'/export'}>
                        <i className='fas fa-upload me-2'></i>Generate for
                        Upload
                    </NavLink>
                </div>
            </nav>
        </div>
    );
};

export default SideBar;
