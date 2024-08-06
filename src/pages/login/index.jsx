import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from '../../data_source/redux/userSlice/slice'; 
import { useNavigate } from 'react-router-dom'; 
import './login.css';
import { Link } from 'react-router-dom'; 

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/login', formData);
            const { token, user } = response.data;
            dispatch(login({ token, user }));
            console.log(response);
            navigate('/dashboard'); 
        } catch (err) {
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className="sign-up-container">
            <div className="sign-up-card">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={onSubmit}>
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
                    <button type="submit">Login</button>
                </form>
                <div className="login-link">
                    Don't have an account? <Link to="/signup">Sign up here</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
