import { Routes, Route } from 'react-router-dom';

import { Dashboard, HOME, CONTRACTS, HIERARCHY } from './Pages';
import CONTRACTS_OUTLET from './Pages/ContractsList';
import HIERARCHY_OUTLET from './Pages/Hierarchy';
import NOT_FOUND from './Pages/NotFound';

import UpdateProvider from './Providers/UpdateProvider';

function App() {
  return (
    <div className='wrapper'>
      <Routes>
        <Route path='/' element={<Dashboard />}>
          <Route index element={<HOME />} />
          <Route path='/contracts' element={<CONTRACTS_OUTLET />}>
            <Route path=':contractId' element={<CONTRACTS.SHOW />} />
            <Route path='add' element={<CONTRACTS.ADD />} />
            <Route path='all' element={<CONTRACTS.LIST />} />
            <Route path='active' element={<CONTRACTS.ACTIVE />} />
            <Route path='expired' element={<CONTRACTS.ACTIVE />} />
            <Route path='search' element={<CONTRACTS.SEARCH />} />
            <Route
              path=':contractId/update'
              element={
                <UpdateProvider>
                  <CONTRACTS.UPDATE />
                </UpdateProvider>
              }
            />
          </Route>

          <Route path='/report/:contractId' element={<CONTRACTS.REPORT />} />
          <Route path='/export' element={<CONTRACTS.UPLOAD />} />
          <Route path='/hierarchy' element={<HIERARCHY_OUTLET />}>
            <Route index element={<HIERARCHY.ADD />} />
            <Route path='branches' element={<HIERARCHY.BRANCHES />} />
            <Route path='districts' element={<HIERARCHY.DISTRICTS />} />
            <Route path='regions' element={<HIERARCHY.REGIONS />} />
            <Route
              path='branches/:branchId'
              element={<HIERARCHY.UPDATE_BRANCH />}
            />
            <Route
              path='districts/:districtId'
              element={<HIERARCHY.UPDATE_DISTRICT />}
            />
            <Route
              path='districts/:districtId/summary'
              element={<HIERARCHY.DISTRICT_SUMMARY />}
            />
            <Route
              path='regions/:regionId'
              element={<HIERARCHY.UPDATE_REGION />}
            />
          </Route>

          <Route path='*' element={<NOT_FOUND />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
