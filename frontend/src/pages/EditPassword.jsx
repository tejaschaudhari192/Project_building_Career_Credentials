import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const EditPassword = ({ token }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                API_URL + '/auth/password',
                { username, currentPassword, newPassword },
                { headers: { Authorization: token } }
            );
            // navigate('/login');
            alert('updated')
        } catch (err) {
            alert(err)
        }
    };

    return (
        <div className='flex flex-col text-center items-center gap-5'>
<div className=''></div>
            <h1>Edit Password</h1>
            <button className='w-fit' onClick={() => navigate('/dashboard')}>Goto Dashboard</button>

            <form onSubmit={handleSubmit} className='w-[200px] gap-4 m-10 items-center h-fit flex flex-col'>
                <div className='flex gap-3'>
                    <label>Username: </label>
                    <input
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='flex gap-3'>

                    <label>Current Password:</label>

                    <input
                        type="password"
                        placeholder="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>

                <div className='flex gap-3'>

                    <label>New Password:</label>

                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <button type="submit">Update Password</button>

            </form>
        </div>
    );
};

export default EditPassword;