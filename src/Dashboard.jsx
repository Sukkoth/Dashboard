import SideBar from './Components/SideBar';
import BackToTop from './Components/BackToTop';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import { Outlet } from 'react-router-dom';
import { LayoutContext } from './Providers/LayoutProvider';
import { useContext } from 'react';

const Dashboard = () => {
  const { sidebarToggle } = useContext(LayoutContext);
  return (
    <div className='container-fluid position-relative bg-white d-flex p-0'>
      <SideBar />
      <div className={`content ${!sidebarToggle && 'open'}`}>
        <NavBar />
        <Outlet />
        <Footer />
      </div>
      <BackToTop />
    </div>
  );
};

export default Dashboard;
