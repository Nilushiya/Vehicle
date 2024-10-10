import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [token, setToken] = useState('');

  const handleLogin = async () => {
    // Replace with actual OIDC login logic
    const response = await axios.post('https://your-identity-provider.com/oauth/token', {
      // Required OIDC parameters (client_id, client_secret, etc.)
    });

    setToken(response.data.access_token);
    localStorage.setItem('token', response.data.access_token);
    window.location.href = '/profile';
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login with OIDC</button>
    </div>
  );
};

export default Login;
