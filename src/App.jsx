import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import AddContract from './Pages/AddContract';
import Index from './Pages/Index';
import ListContracts from './Pages/ListContracts';
import ShowContract from './Pages/ShowContract';

function App() {
    return (
        <div className='wrapper'>
            <Routes>
                <Route path='/login' Component={Login} />
                <Route path='/' Component={Dashboard}>
                    <Route index Component={Index} />
                    <Route path='/add-contract' Component={AddContract} />
                    <Route path='/list-contracts' Component={ListContracts} />
                    <Route
                        path='/leases/:contractId'
                        Component={ShowContract}
                    />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
