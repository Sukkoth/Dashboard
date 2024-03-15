import { useContext } from 'react';

import { LayoutContext } from '../../Providers/LayoutProvider';
import SidebarHeader from './Header';
import Content from './Content';

const SideBar = () => {
  const { sidebarToggle } = useContext(LayoutContext);

  return (
    <div
      className={`sidebar ${!sidebarToggle && 'open'} pe-1 pb-3`}
      style={{ backgroundColor: 'white' }}
    >
      <nav className='navbar navbar-dark' style={{ backgroundColor: 'white' }}>
        <SidebarHeader />
        <Content />
      </nav>
    </div>
  );
};

export default SideBar;
