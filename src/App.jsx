import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';

function App() {
    return (
        <div className='wrapper'>
            <Routes>
                <Route path='/login' Component={Login} />
                <Route path='/' Component={Dashboard}></Route>
            </Routes>
        </div>
    );
}

export default App;
