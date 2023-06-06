import React from 'react';
import Index from './Index';
import SideBar from './Components/SideBar';
import BackToTop from './Components/BackToTop';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='container-fluid position-relative bg-white d-flex p-0'>
            <SideBar />

            {/* <!-- Content Start --> */}
            <div className='content'>
                <NavBar />
                <Outlet />
                {/* EMPTY PAGE GOES HERE */}

                <Index />

                <Footer />
            </div>

            <BackToTop />
        </div>
    );
};

export default Dashboard;
