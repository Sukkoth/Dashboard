import { useContext } from 'react';
import { LayoutContext } from '../Providers/LayoutProvider';

const NavBar = () => {
    const { setSidebarToggle } = useContext(LayoutContext);
    return (
        <nav
            className='navbar navbar-expand bg-white navbar-white sticky-top px-4 py-3'
            style={{ boxShadow: 'none' }}
        >
            <a href='index.html' className='navbar-brand d-flex d-lg-none me-4'>
                <h2 className='text-primary mb-0'>
                    <i className='fa fa-hashtag'></i>
                </h2>
            </a>
            <a
                href='#'
                className='flex-shrink-0'
                onClick={() => setSidebarToggle((prev) => !prev)}
            >
                <i className='fa fa-bars'></i>
            </a>
        </nav>
    );
};

export default NavBar;
