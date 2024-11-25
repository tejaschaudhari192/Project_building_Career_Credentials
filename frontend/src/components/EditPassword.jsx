import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const EditPassword = ({ token }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [username,setUsername]=useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                API_URL+'/auth/password',
                { username, currentPassword, newPassword },
                { headers: { Authorization: token } }
            );
            navigate('/login');
        } catch (err) {
            alert(err)
        }
    };

    return (
        <div>
            <h2>Edit Password</h2>
            <form onSubmit={handleSubmit} className='w-[200px] gap-4 m-10 items-center h-fit flex flex-col'>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type="submit">Update Password</button>
            </form>
        </div>
    );
};

export default EditPassword;