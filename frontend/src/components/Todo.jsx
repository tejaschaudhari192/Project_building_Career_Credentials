import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

const Todo = ({ token }) => {
    token = localStorage.getItem('token')
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const res = await axios.get(API_URL+'/todos', {
                headers: { Authorization: token },
            });
            setTodos(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const addTodo = async () => {
        try {
            const res = await axios.post(
                API_URL+'/todos/',
                { task },
                { headers: { Authorization: token } }
            );
            fetchTodos()
            setTask('');
        } catch (err) {
            alert(err)
        }
    };

    const deleteTodo = async (id) => {
        try {
            const res = await axios.delete(
                API_URL+`/todos/${id}`,
                { headers: { Authorization: token } }
            );

            fetchTodos()


        } catch (err) {
            console.error(err);
        }
    };

    const toggleComplete = async (id, completed) => {
        try {
            await axios.put(
                API_URL+`/todos/${id}`,
                { completed: !completed },
                { headers: { Authorization: token } }
            );
            fetchTodos();
        } catch (err) {
            alert(err)
        }
    };

    return (
        <div>
            
            <h1>Your To-Do List</h1>
            <button onClick={() => navigate('/dashboard')}>Goto Dashboard</button>

            {todos.length < 1 ? '' : (
                <table className="w-10/12 border border-gray-300 text-center">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Task</th>
                            <th className="border px-4 py-2">Date Added</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {todos.map((todo, index) => (
                            <tr key={index}>

                                <td style={{ textDecoration: todo.completed ? 'line-through' : 'none', marginRight: '10px' }}>
                                    {todo.task}
                                </td>
                                <td style={{ marginRight: '10px' }}>
                                    {new Date(todo.date_added).toLocaleString()}
                                </td>
                                <td>

                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => toggleComplete(todo.id, todo.completed)}
                                    />
                                </td>
                                <td>

                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <input
                type="text"
                placeholder="Add a new task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={addTodo}>Add</button>
        </div>
    );
};

export default Todo;
