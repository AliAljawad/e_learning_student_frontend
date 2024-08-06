import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from '../../data_source/redux/userSlice/slice'; 
import { useNavigate } from 'react-router-dom'; 
import './signup.css'
import { Link } from 'react-router-dom';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const { name, email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const response = await axios.post('http://localhost:8080/users/register', formData);
            console.log(response);
            const { token, user } = response.data;
            dispatch(login({ token, user }));
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="sign-up-container">
            <div className="sign-up-card">
                <h2>Register</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={onChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
                <div className="login-link">
                    Already have an account? <Link to="/login">Login here</Link>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
