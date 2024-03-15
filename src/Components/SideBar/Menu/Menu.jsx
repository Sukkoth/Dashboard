import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

function Menu({ children }) {
  return <div className='navbar-nav w-100 mt-4'>{children}</div>;
}

Menu.Item = function Item({ children, icon, to }) {
  return (
    <NavLink to={to} className='nav-item nav-link'>
      <img src={icon} className='sidebar-icon' />
      {children}
    </NavLink>
  );
};

Menu.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

Menu.Item.propTypes = {
  children: PropTypes.string,
  icon: PropTypes.any,
  to: PropTypes.string,
};

export default Menu;
