import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import EditPassword from './components/EditPassword';
import Todo from './components/Todo';
import './App.css'

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const saveToken = (userToken) => {
        localStorage.setItem('token', userToken);
        setToken(userToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <div className='h-screen p-12 w-screen'>
            <Router>
                <Routes>
                    <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<Login setToken={saveToken} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/edit-password" element={<EditPassword />} />
                    <Route path="/todo" element={<Todo />} />
                    <Route path="/dashboard" element={token ? <Dashboard token={token} logout={logout} /> : <Navigate to="/login" />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
