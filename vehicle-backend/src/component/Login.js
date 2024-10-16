import {GoogleLogin} from 'react-google-login';
import React from 'react';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const clientId = 'xMdhFFH33wHu2mA6v5DRx0PMPFoCvUfM'; 
// const clientSecret = '6YW06UjhUq6jb2NiWZSOzwwVKG-BbzgyKCL66sORYe1R6ysMF344t8e6Kj6D6ISY'; 
// const redirectUri = 'https://your-app.com/callback';
// const authorizationUrl = `https://dev-i0uvn03usjt2medx.us.auth0.com/authorize`;
// const tokenUrl = `https://dev-i0uvn03usjt2medx.us.auth0.com/oauth/token`;

// const Login = () => {
//   const [token, setToken] = useState('');


//   const redirectToLogin = () => {
//     const scope = 'openid profile email'; 
//     const loginUrl = `${authorizationUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
//     window.location.href = loginUrl; 
//   };

 
//   const handleLogin = async (authCode) => {
//     try {
//       const response = await axios.post(tokenUrl, {
//         grant_type: 'authorization_code',
//         client_id: clientId,
//         client_secret: clientSecret,
//         code: authCode,
//         redirect_uri: redirectUri,
//       });

//       const { access_token } = response.data;
//       setToken(access_token);
//       localStorage.setItem('token', access_token);
//       window.location.href = '/profile'; 
//     } catch (error) {
//       console.error('Token exchange failed:', error);
//     }
//   };

 
//   const handleCallback = () => {
//     const params = new URLSearchParams(window.location.search);
//     const authCode = params.get('code'); 

//     if (authCode) {
//       handleLogin(authCode); 
//     } else {
//       console.error('Authorization code not found.');
//     }
//   };

//   useEffect(() => {
//     if (window.location.search.includes('code=')) {
//       handleCallback(); 
//     }
//   }, []);

//   return (
//     <div>
//       <h2>Login</h2>
//       <button onClick={redirectToLogin}>Login with OIDC</button>
//       {token && <p>Access Token: {token}</p>} 
//     </div>
//   );
// };

// export default Login;

const clientId = "1086409569404-401eq7v6cdhdks04kuie3m2jaude4l3p.apps.googleusercontent.com";

function Login(){

  const onSuccess = (res) => {
    console.log(res.profileObj);
  console.log("LOGIN SUCCESS! Current user: ", res.profileobj);}
  const onFailure = (res) =>{
  console.log("LOGIN FAILED! res: ", res);}


  return(
  <div id="signInButton">
  <GoogleLogin
  clientId={clientId}
  buttonText="Login"
  onSuccess={onSuccess }
  onFailure={onFailure}
  cookiePolicy={'single_host_origin' }
  isSignedIn={true}
  />
  </div>
  )
}

export default Login

