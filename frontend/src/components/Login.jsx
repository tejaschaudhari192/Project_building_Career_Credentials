import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(API_URL+'/auth/login', { username, password });
            setToken(res.data.token);
            navigate('/dashboard');
        } catch (err) {
            alert('Invalid credentials');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className='w-[200px] gap-4 m-10 items-center h-fit flex flex-col'>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>

                <p>
                    New ?
                    <span
                        onClick={() => navigate('/register')}
                        className='text-blue-500 cursor-pointer'
                    >
                        click to register
                    </span>
                </p>
            </form>

            {/* <button onClick={() => navigate('/edit-password')}>Update Password</button> */}
        </div>
    );
};

export default Login;
