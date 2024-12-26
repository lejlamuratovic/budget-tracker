import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        localStorage.setItem('userEmail', email);
        navigate('/dashboard');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            />
            <button onClick={handleLogin} style={{ padding: '10px 20px' }}>
                Login
            </button>
        </div>
    );
};

export default LoginPage;
