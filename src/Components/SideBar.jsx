import { useContext } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/img/user.jpg';
import { LayoutContext } from '../Providers/LayoutProvider';

const SideBar = () => {
    const { sidebarToggle } = useContext(LayoutContext);
    return (
        <div className={`sidebar ${!sidebarToggle && 'open'} pe-4 pb-3`}>
            <nav className='navbar bg-light navbar-light'>
                <Link to='/' className='navbar-brand mx-4 mb-3'>
                    <h3 className='text-primary'>
                        <i className='fa fa-hashtag me-2'></i>CBELM
                    </h3>
                </Link>

                <div className='d-flex align-items-center ms-4 mb-4'>
                    <div className='position-relative'>
                        <img
                            className='rounded-circle'
                            src={avatar}
                            alt=''
                            style={{ width: '40px', height: '40px' }}
                        />
                        <div className='bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1'></div>
                    </div>
                    <div className='ms-3'>
                        <h6 className='mb-0'>John Doe</h6>
                        <span>Admin</span>
                    </div>
                </div>
                <div className='navbar-nav w-100'>
                    <Link to='/' className='nav-item nav-link active'>
                        <i className='fa fa-tachometer-alt me-2'></i>
                        Dashboard
                    </Link>
                    <div className='nav-item dropdown'>
                        <a
                            href='#'
                            className='nav-link dropdown-toggle'
                            data-bs-toggle='dropdown'
                        >
                            <i className='fa fa-laptop me-2'></i>Contracts
                        </a>
                        <div className='dropdown-menu bg-transparent border-0'>
                            <Link to='/add-contract' className='dropdown-item'>
                                <i
                                    className='fa fa-plus me-2'
                                    style={{ color: '#d30fa9' }}
                                ></i>
                                Add
                            </Link>
                            <Link
                                to='/list-contracts'
                                className='dropdown-item'
                            >
                                <i
                                    className='fa fa-list me-2'
                                    style={{ color: '#d30fa9' }}
                                ></i>
                                List
                            </Link>
                        </div>
                    </div>
                    {/* <a href='widget.html' className='nav-item nav-link'>
                        <i className='fa fa-th me-2'></i>Widgets
                    </a>
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
