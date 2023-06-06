import React from 'react';
import Index from './Pages/Index';
import SideBar from './Components/SideBar';
import BackToTop from './Components/BackToTop';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='container-fluid position-relative bg-white d-flex p-0'>
            <SideBar />
            <div className='content'>
                <NavBar />
                <Outlet />
                <Footer />
            </div>

            <BackToTop />
        </div>
    );
};

export default Dashboard;
