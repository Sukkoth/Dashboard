import Menu from './Menu/Menu';
import SIDEBAR_ICONS from './icons';
import Dropdown from './Menu/Dropdown';

function Content() {
  return (
    <Menu>
      <Menu.Item to='/' icon={SIDEBAR_ICONS.DASHBOARD_ICON}>
        Dashboard
      </Menu.Item>
      <Dropdown>
        <Dropdown.Title icon={SIDEBAR_ICONS.CONTRACTS_LIST_ICON}>
          Contracts
        </Dropdown.Title>
        <Dropdown.List>
          <Dropdown.Item
            to='/contracts/add'
            icon={SIDEBAR_ICONS.ADD_CONTRACT_ICON}
          >
            Add
          </Dropdown.Item>
          <Dropdown.Item
            to='/contracts/all'
            icon={SIDEBAR_ICONS.LIST_CONTRACTS_ICON}
          >
            List All
          </Dropdown.Item>
          <Dropdown.Item
            to='/contracts/active'
            icon={SIDEBAR_ICONS.ACTIVE_CONTRACT_ICON}
          >
            Active Contracts
          </Dropdown.Item>
          <Dropdown.Item
            to='/contracts/expired'
            icon={SIDEBAR_ICONS.EXPIRED_CONTRACT_ICON}
          >
            Expired Contracts
          </Dropdown.Item>
          <Dropdown.Item
            to='/contracts/search'
            icon={SIDEBAR_ICONS.SEARCH_ICON}
          >
            Search
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
      <Dropdown>
        <Dropdown.Title icon={SIDEBAR_ICONS.REPORTS_ICON}>
          Reports
        </Dropdown.Title>
        <Dropdown.List>
          <Menu.Item
            icon={SIDEBAR_ICONS.SUMMARY_ICON}
            to={'/hierarchy/districts/1/summary'}
          >
            District Summary
          </Menu.Item>

          <Menu.Item icon={SIDEBAR_ICONS.UPLOAD_ICON} to='/export'>
            Monthly Expense Report
          </Menu.Item>
        </Dropdown.List>
      </Dropdown>
      <Dropdown>
        <Dropdown.Title icon={SIDEBAR_ICONS.HIERARCHY_ICON}>
          Hierarchy
        </Dropdown.Title>
        <Dropdown.List>
          <Dropdown.Item to={'/hierarchy'} icon={SIDEBAR_ICONS.BANK_ICON} end>
            Add
          </Dropdown.Item>

          <Dropdown.Item
            to={'/hierarchy/branches'}
            icon={SIDEBAR_ICONS.BRANCHES_ICON}
          >
            Branches
          </Dropdown.Item>
          <Dropdown.Item
            to={'/hierarchy/districts'}
            icon={SIDEBAR_ICONS.DISTRICTS_ICON}
          >
            Districts
          </Dropdown.Item>
          <Dropdown.Item
            to={'/hierarchy/regions'}
            icon={SIDEBAR_ICONS.REGIONS_ICON}
          >
            Regions
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </Menu>
  );
}

export default Content;
