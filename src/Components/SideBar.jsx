import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import avatar from '../assets/icon.png';

import { LayoutContext } from '../Providers/LayoutProvider';

const SideBar = () => {
    const { sidebarToggle } = useContext(LayoutContext);
    return (
        <div className={`sidebar ${!sidebarToggle && 'open'} pe-4 pb-3`}>
            <nav className='navbar bg-light navbar-light'>
                <Link to='/' className='navbar-brand mx-4 mb-3'>
                    <h3 className='text-primary'>
                        <i className='fa fa-hashtag me-2 text-secondary'></i>
                        CBELM
                    </h3>
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
                <div className='navbar-nav w-100'>
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
                                className='dropdown-item mb-3 mx-4 '
                            >
                                <i className='fa fa-plus me-2 text-dark'></i>
                                Add
                            </NavLink>
                            <NavLink
                                to='/list-contracts/all'
                                className='dropdown-item mb-3 mx-4'
                            >
                                <i className='fa fa-list me-2 text-dark'></i>
                                List All
                            </NavLink>
                            <NavLink
                                to='/list-contracts/active'
                                className='dropdown-item mb-3 mx-4'
                            >
                                <i className='fas fa-file-contract me-2 text-dark'></i>
                                Active Contracts
                            </NavLink>
                            <NavLink
                                to='/list-contracts/ended'
                                className='dropdown-item mb-3 mx-4'
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

                    {/*
                    <a href='form.html' className='nav-item nav-link'>
                        <i className='fa fa-keyboard me-2'></i>Forms
                    </a>
                    <a href='table.html' className='nav-item nav-link'>
                        <i className='fa fa-table me-2'></i>Tables
                    </a>
                    <a href='chart.html' className='nav-item nav-link'>
                        <i className='fa fa-chart-bar me-2'></i>Charts
                    </a> */}
                    {/* <div className='nav-item dropdown'>
                        <a
                            href='#'
                            className='nav-link dropdown-toggle'
                            data-bs-toggle='dropdown'
                        >
                            <i className='far fa-file-alt me-2'></i>Pages
                        </a>
                        <div className='dropdown-menu bg-transparent border-0'>
                            <a href='signin.html' className='dropdown-item'>
                                Sign In
                            </a>
                            <a href='signup.html' className='dropdown-item'>
                                Sign Up
                            </a>
                            <a href='404.html' className='dropdown-item'>
                                404 Error
                            </a>
                            <a href='blank.html' className='dropdown-item'>
                                Blank Page
                            </a>
                        </div>
                    </div> */}
                </div>
            </nav>
        </div>
    );
};

export default SideBar;
