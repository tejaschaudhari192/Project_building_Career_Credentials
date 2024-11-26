import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Dashboard = ({ token, logout }) => {
    const [user, setUser] = useState({ fname: '', lname: '', branch: '', degree: '', year: '', phone: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetails = async () => {
            try {

                const res = await axios.get(API_URL + '/auth/me', {
                    headers: { Authorization: token },
                })
                setUser(res.data);


            } catch (err) {
                if (err.status == 401) {
                    navigate('/login')
                }
            }
        }
        fetchDetails();
    }, []);

    const updateDetails = async () => {
        try {
            await axios.put(
                API_URL + '/auth/update',
                user,
                { headers: { Authorization: token } }
            );
            alert('Details updated successfully!');
        } catch (err) {

        }
    };

    return (
        <div className='h-full w-full p-6'>
            <div className='flex w-full justify-between'>
                <h1 >Dashboard</h1>
                <div className='gap-10 flex'>
                    <button onClick={() => navigate('/todo')}>Tasks</button>
                    <button onClick={() => navigate('/edit-password')}>Update Password</button>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
            <div className='h-fit w-full flex  items-center flex-col'>
                <div className='flex flex-col my-10 gap-5 justify-start'>
                    <div className='flex gap-5 h-7'>
                        <label>First Name:</label>
                        <input type="text" value={user.fname} readOnly />
                        <button onClick={() => {
                            setUser({ ...user, fname: prompt("Enter fname") })
                        }}>✒️</button>
                    </div>
                    <div className='flex gap-5 h-7'>

                        <label>Last Name:</label>
                        <input type="text" value={user.lname} readOnly />
                        <button onClick={() => {
                            setUser({ ...user, lname: prompt("Enter lname") })
                        }}>✒️</button>
                    </div>
                    <div className='flex gap-5 h-7'>
                        <label>Email:</label>
                        <input type="email" value={user.email} readOnly />
                    </div>
                    <div className='flex gap-5 h-7'>
                        <label>Phone:</label>
                        <input type="text" value={user.phone} readOnly />
                        <button onClick={() => {
                            setUser({ ...user, phone: prompt("Enter Phone") })
                        }}>✒️</button>
                    </div>
                    <div className='flex gap-5 h-7'>
                        <label>Branch:</label>
                        <input type="text" value={user.branch} readOnly />
                        <button onClick={() => {
                            setUser({ ...user, branch: prompt("Enter branch") })
                        }}>✒️</button>
                    </div>
                    <div className='flex gap-5 h-7'>
                        <label>Degree:</label>
                        <input type="text" value={user.degree} readOnly />
                        <button onClick={() => {
                            setUser({ ...user, degree: prompt("Enter degree") })
                        }}>✒️</button>
                    </div>
                    <div className='flex gap-5 h-7'>

                        <label>Year:</label>
                        <input type="number" value={user.year} readOnly />
                        <button onClick={() => {
                            setUser({ ...user, year: prompt("Enter year") })
                        }}>✒️</button>
                    </div>
                </div>


                <button onClick={updateDetails}>Save</button>

            </div>
        </div>
    );
};

export default Dashboard;
