import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './Index';

function App() {
    return (
        <div className='wrapper'>
            <Routes>
                <Route path='/' Component={Index} />
            </Routes>
        </div>
    );
}

export default App;
