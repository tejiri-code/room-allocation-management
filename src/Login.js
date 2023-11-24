import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notify } from './Notification';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8082/login', {
        E_mail: username,
        Password: password,
      });

      const data = response.data;

      if (data.code === 200) {
        notify('Login successful!');
        navigate('/allocation');
      } else {
        notify('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('API Error:', error);
      notify('An error occurred while trying to log in.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" className="text-sm font-medium text-gray-600">
            Work E-mail
          </label>
          <input
            type="email"
            id="username"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
