import React, { useEffect, useState } from 'react';
import axios from 'axios';

const clientId = 'xMdhFFH33wHu2mA6v5DRx0PMPFoCvUfM'; // Replace with your actual client ID
const clientSecret = '6YW06UjhUq6jb2NiWZSOzwwVKG-BbzgyKCL66sORYe1R6ysMF344t8e6Kj6D6ISY'; // Replace with your actual client secret
const redirectUri = 'https://your-app.com/callback'; // Replace with your actual redirect URI
const authorizationUrl = `https://dev-i0uvn03usjt2medx.us.auth0.com/authorize`;
const tokenUrl = `https://dev-i0uvn03usjt2medx.us.auth0.com/oauth/token`;

const Login = () => {
  const [token, setToken] = useState('');

  // Redirects user to the OIDC provider for login
  const redirectToLogin = () => {
    const scope = 'openid profile email'; // Define scopes
    const loginUrl = `${authorizationUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    window.location.href = loginUrl; // Redirect to login page
  };

  // Exchanges the authorization code for an access token
  const handleLogin = async (authCode) => {
    try {
      const response = await axios.post(tokenUrl, {
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        code: authCode,
        redirect_uri: redirectUri,
      });

      const { access_token } = response.data;
      setToken(access_token);
      localStorage.setItem('token', access_token);
      window.location.href = '/profile'; // Redirect to profile page
    } catch (error) {
      console.error('Token exchange failed:', error);
    }
  };

  // Handles the callback from the OIDC provider
  const handleCallback = () => {
    const params = new URLSearchParams(window.location.search);
    const authCode = params.get('code'); // Get the authorization code from the URL

    if (authCode) {
      handleLogin(authCode); // Exchange the code for tokens
    } else {
      console.error('Authorization code not found.');
    }
  };

  useEffect(() => {
    // Check if the user is coming back from the OIDC provider
    if (window.location.search.includes('code=')) {
      handleCallback(); // Process the callback
    }
  }, []);

  return (
    <div>
      <h2>Login</h2>
      <button onClick={redirectToLogin}>Login with OIDC</button>
      {token && <p>Access Token: {token}</p>} {/* Optionally display the token */}
    </div>
  );
};

export default Login;

