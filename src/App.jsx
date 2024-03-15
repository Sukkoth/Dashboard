import { Routes, Route, Outlet } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import AddContract from './Pages/AddContract';
import Index from './Pages/Index';
import ListContracts from './Pages/ContractsList/ListContracts';
import Contracts from './Pages/ContractsList';
import ShowContract from './Pages/ShowContract';
import SingleContractReport from './Pages/SingleContractReport';
import ExportForUpload from './Pages/ExportForUpload';
import EndedContracts from './Pages/ContractsList/EndedContracts';
import ListActiveContracts from './Pages/ContractsList/ListActiveContracts';
import Hierarchy from './Pages/Hierarchy';
import AddHierarchy from './Pages/Hierarchy/Add';
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
          <Route path='/contracts' element={<Contracts />}>
            <Route path=':contractId' element={<ShowContract />} />
            <Route path='add' element={<AddContract />} />
            <Route path='all' element={<ListContracts />} />
            <Route path='active' element={<ListActiveContracts />} />
            <Route path='expired' element={<EndedContracts />} />
            <Route path='search' element={<Search />} />
            <Route
              path='update'
              element={
                <UpdateProvider>
                  <UpdateContract />
                </UpdateProvider>
              }
            />
          </Route>
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
          <Route path='/hierarchy' element={<Hierarchy />}>
            <Route index element={<AddHierarchy />} />
            <Route path='branches' element={<ListBranches />} />
            <Route path='districts' element={<ListDistricts />} />
            <Route path='regions' element={<ListRegions />} />
            <Route path='branches/:branchId' element={<UpdateBranch />} />
            <Route path='districts/:districtId' element={<UpdateDistrict />} />
            <Route
              path='districts/:districtId/summary'
              element={<DistrictSummary />}
            />
            <Route path='regions/:regionId' element={<UpdateRegion />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
