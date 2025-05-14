import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './Login.css';

function Login({ onLogin }) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = (credentialResponse) => {
    setIsLoading(true);
    try {
      // In a real app, you would verify the token on your backend
      console.log('Google login successful:', credentialResponse);
      
      // Pass the response to the parent component
      if (onLogin) onLogin(credentialResponse);
      
      setError('');
    } catch (err) {
      console.error('Login error:', err);
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = () => {
    setIsLoading(false);
    setError('Google login failed. Please try again.');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome</h1>
        <p>Sign in to continue</p>
        
        <div className="login-methods">
          <div className="google-signin-wrapper">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              useOneTap
              theme="filled_blue"
              text="signin_with"
              shape="rectangular"
              logo_alignment="center"
              width="280"
            />
          </div>
        </div>
        
        {isLoading && <p className="loading-message">Logging in...</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
