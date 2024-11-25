import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_URL+'/auth/register', { username, email, password });
            navigate('/login');
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} className='w-[200px] gap-4 m-10 items-center h-fit flex flex-col'>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
                <p>
                    existing ?
                    <span
                        onClick={() => navigate('/login')}
                        className='text-blue-500 cursor-pointer'
                    >
                        click to login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Register;
