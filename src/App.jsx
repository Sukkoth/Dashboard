import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import AddContract from './Pages/AddContract';
import Index from './Pages/Index';
import ListContracts from './Pages/ContractsList/ListContracts';
import ShowContract from './Pages/ShowContract';
import SingleContractReport from './Pages/SingleContractReport';
import ExportForUpload from './Pages/ExportForUpload';
import EndedContracts from './Pages/ContractsList/EndedContracts';
import ListActiveContracts from './Pages/ContractsList/ListActiveContracts';
import Hierarchy from './Pages/Hierarchy/Hierarchy';
import UpdateContract from './Pages/UpdateContract';
import UpdateProvider from './Providers/UpdateProvider';
import Search from './Pages/ContractsList/Search';
import ListBranches from './Pages/Hierarchy/Branches/ListBranches';
import ListDistricts from './Pages/Hierarchy/District/ListDistricts';
import ListRegions from './Pages/Hierarchy/Regions/ListRegions';
import UpdateRegion from './Pages/Hierarchy/Regions/UpdateRegion';
import UpdateDistrict from './Pages/Hierarchy/District/UpdateDistrict';
import UpdateBranch from './Pages/Hierarchy/Branches/UpdateBranch';
import DistrictSummary from './Pages/Hierarchy/District/Summary/DistrictSummary';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <div className='wrapper'>
      <Routes>
        <Route path='/login' Component={Login} />
        <Route path='/' Component={Dashboard}>
          <Route index Component={Index} />
          <Route path='/add-contract' Component={AddContract} />
          <Route path='/list-contracts/all' Component={ListContracts} />
          <Route path='/list-contracts/ended' Component={EndedContracts} />
          <Route
            path='/list-contracts/active'
            Component={ListActiveContracts}
          />
          <Route path='/list-contracts/search' Component={Search} />
          <Route path='/leases/:contractId' Component={ShowContract} />
          <Route
            path='/leases/:contractId/update'
            element={
              <UpdateProvider>
                <UpdateContract />
              </UpdateProvider>
            }
          />
          <Route path='/report/:contractId' Component={SingleContractReport} />
          <Route path='/export' Component={ExportForUpload} />
          <Route path='/hierarchy' Component={Hierarchy} />
          <Route path='/hierarchy/branches' Component={ListBranches} />
          <Route path='/hierarchy/districts' Component={ListDistricts} />
          <Route path='/hierarchy/regions' Component={ListRegions} />
          <Route
            path='/hierarchy/branches/:branchId'
            Component={UpdateBranch}
          />
          <Route
            path='/hierarchy/districts/:districtId'
            Component={UpdateDistrict}
          />
          <Route
            path='/hierarchy/districts/:districtId/summary'
            Component={DistrictSummary}
          />
          <Route path='/hierarchy/regions/:regionId' Component={UpdateRegion} />
          <Route path='*' Component={NotFound} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
