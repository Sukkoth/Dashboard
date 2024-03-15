import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @description Dropdown Compound Component
 * This is a compound component for creating dropdown menus with React Router links.
 *
 * @usage
 *
 * ```jsx
 * <Dropdown>
 *    <Dropdown.Title icon={icon}>Title of your dropdown menu</Dropdown.Title>
 *    <Dropdown.List>
 *      <Dropdown.Item icon={icon} to={to}>
 *        Item name here
 *      </Dropdown.Item>
 *    </Dropdown.List>
 * </Dropdown>
 */
function Dropdown({ children }) {
  return <div className='nav-item dropdown'>{children}</div>;
}

/**
 * @description Title component for Dropdown
 * Renders a title for the dropdown menu.
 *
 * @props {icon} - Image asset (required)
 */
Dropdown.Title = function Title({ children, icon }) {
  return (
    <Link
      href='#'
      className='nav-link dropdown-toggle'
      data-bs-toggle='dropdown'
    >
      <img src={icon} className='sidebar-icon' />
      {children}
    </Link>
  );
};

/**
 * @description List component for Dropdown
 * Renders a list of items inside the dropdown menu.
 */
Dropdown.List = function List({ children }) {
  return (
    <div className='dropdown-menu bg-transparent border-0'>{children}</div>
  );
};

/**
 * @description Item component for Dropdown
 * Renders an item inside the dropdown menu.
 *
 * @props {icon} - Image asset (required)
 *        {end} - Boolean indicating whether the NavLink should have 'end' property (https://reactrouter.com/en/main/components/nav-link#end)
 *        {to} - Link address (same as to on NavLink)
 */
Dropdown.Item = function Item({ children, icon, end, to }) {
  return (
    <NavLink end={end} className={`dropdown-item mb-1 mx-4`} to={to}>
      <img src={icon} className='sidebar-icon' />
      {children}
    </NavLink>
  );
};

// PROP TYPES
Dropdown.propTypes = {
  children: PropTypes.string.isRequired,
};
Dropdown.Title.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
};
Dropdown.List.propTypes = {
  children: PropTypes.string.isRequired,
};
Dropdown.Item.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
  end: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

export default Dropdown;
