import { useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { LayoutContext } from '../Providers/LayoutProvider';
import avatar from '../assets/icon.png';
import dashboardIcon from '../assets/img/dashboard.png';
import contractsListIcon from '../assets/img/signature.png';
import uploadIcon from '../assets/img/uploadd.png';
import listContractsIcon from '../assets/img/list.png';
import addContractIcon from '../assets/img/addContract.png';
import expiredContractIcon from '../assets/img/expired.png';
import activeContractIcon from '../assets/img/active.png';
import bankIcon from '../assets/img/bank.png';
import branchesIcon from '../assets/img/branches.png';
import districtsIcon from '../assets/img/briefcase.png';
import regionsIcon from '../assets/img/globe.png';
import searchIcon from '../assets/img/search.png';
import summaryIcon from '../assets/img/summary.png';
import hierarchyIcon from '../assets/img/hierarchy.png';
import reportsIcon from '../assets/img/graph.png';

const SideBar = () => {
  const { sidebarToggle } = useContext(LayoutContext);
  const { pathname } = useLocation();
  return (
    <div
      className={`sidebar ${!sidebarToggle && 'open'} pe-1 pb-3`}
      style={{ backgroundColor: 'white' }}
    >
      <nav className='navbar navbar-dark' style={{ backgroundColor: 'white' }}>
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
              src={avatar}
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
            <img src={dashboardIcon} className='sidebar-icon' />
            Dashboard
          </NavLink>
          <div className='nav-item dropdown'>
            <Link
              href='#'
              className='nav-link dropdown-toggle'
              data-bs-toggle='dropdown'
            >
              <img src={contractsListIcon} className='sidebar-icon' />
              Contracts
            </Link>
            <div className='dropdown-menu bg-transparent border-0'>
              <NavLink to='/add-contract' className='dropdown-item mb-1 mx-4 '>
                <img src={addContractIcon} className='sidebar-icon' />
                Add
              </NavLink>
              <NavLink
                to='/list-contracts/all'
                className='dropdown-item mb-1 mx-4'
              >
                <img src={listContractsIcon} className='sidebar-icon' />
                List All
              </NavLink>
              <NavLink
                to='/list-contracts/active'
                className='dropdown-item mb-1 mx-4'
              >
                <img src={activeContractIcon} className='sidebar-icon' />
                Active Contracts
              </NavLink>
              <NavLink
                to='/list-contracts/ended'
                className='dropdown-item mb-1 mx-4'
              >
                <img src={expiredContractIcon} className='sidebar-icon' />
                Expired Contracts
              </NavLink>
              <NavLink
                to='/list-contracts/search'
                className='dropdown-item mx-4'
              >
                <img src={searchIcon} className='sidebar-icon' />
                Search
              </NavLink>
            </div>
          </div>
          <div className='nav-item dropdown'>
            <Link
              href='#'
              className='nav-link dropdown-toggle'
              data-bs-toggle='dropdown'
            >
              <img src={reportsIcon} className='sidebar-icon' />
              Reports
            </Link>
            <div className='dropdown-menu bg-transparent border-0'>
              <NavLink
                to='/hierarchy/districts/1/summary'
                className='dropdown-item mb-1 mx-4 '
              >
                <img src={summaryIcon} className='sidebar-icon' />
                District Summary
              </NavLink>
              <NavLink to='/export' className='dropdown-item mb-1 mx-4 '>
                <img src={uploadIcon} className='sidebar-icon' />
                Monthly Expense Report
              </NavLink>
            </div>
          </div>

          <div className='nav-item dropdown'>
            <Link
              className='nav-link dropdown-toggle'
              data-bs-toggle='dropdown'
            >
              <img src={hierarchyIcon} className='sidebar-icon' />
              Hierarchy
            </Link>
            <div className='dropdown-menu bg-transparent border-0'>
              <Link
                className={`dropdown-item mb-1 mx-4 ${
                  pathname === '/hierarchy' ? 'active' : ''
                }`}
                to={'/hierarchy'}
              >
                <img src={bankIcon} className='sidebar-icon' />
                Add
              </Link>

              <NavLink
                className='dropdown-item mb-1 mx-4 '
                to={'/hierarchy/branches'}
              >
                <img src={branchesIcon} className='sidebar-icon' />
                Branches
              </NavLink>
              <NavLink
                className='dropdown-item mb-1 mx-4 '
                to={'/hierarchy/districts'}
              >
                <img src={districtsIcon} className='sidebar-icon' />
                Districts
              </NavLink>
              <NavLink
                className='dropdown-item mb-1 mx-4 '
                to={'/hierarchy/regions'}
              >
                <img src={regionsIcon} className='sidebar-icon' />
                Regions
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
