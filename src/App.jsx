import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import AddContract from './Pages/AddContract';
import Index from './Pages/Index';
import ListContracts from './Pages/ListContracts';
import ShowContract from './Pages/ShowContract';
import GenerateReportPage from './Pages/GenerateReportPage';
import SingleContractReport from './Pages/SingleContractReport';
import ExportForUpload from './Pages/ExportForUpload';
import EndedContracts from './Pages/EndedContracts';
import ListActiveContracts from './Pages/ListActiveContracts';
import './App.css';

function App() {
    return (
        <div className='wrapper'>
            <Routes>
                <Route path='/login' Component={Login} />
                <Route path='/' Component={Dashboard}>
                    <Route index Component={Index} />
                    <Route path='/add-contract' Component={AddContract} />
                    <Route
                        path='/list-contracts/all'
                        Component={ListContracts}
                    />
                    <Route
                        path='/list-contracts/ended'
                        Component={EndedContracts}
                    />
                    <Route
                        path='/list-contracts/active'
                        Component={ListActiveContracts}
                    />
                    <Route
                        path='/leases/:contractId'
                        Component={ShowContract}
                    />
                    <Route
                        path='/report/:contractId'
                        Component={SingleContractReport}
                    />
                    <Route
                        path='/generate-report'
                        Component={GenerateReportPage}
                    />
                    <Route path='/export' Component={ExportForUpload} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
