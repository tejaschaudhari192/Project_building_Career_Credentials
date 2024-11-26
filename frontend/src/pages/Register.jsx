import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_URL + '/auth/register', { username, email, password });
            navigate('/login');
        } catch (err) {
            alert(err)
        }
    };

    return (
        <div className='h-full'>

            <h1>Register</h1>
            <form onSubmit={handleSubmit} className='w-full h-[70%] gap-4 items-center justify-center flex flex-col'>

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
