import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../css/Login.css";

function Login() {
  const [username, setUsername] = useState(''); // State to store username
  const [password, setPassword] = useState(''); // State to store password
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Navigation hook

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Show loading state
    setErrorMessage(''); // Reset error message

    try {
      console.log('Sending login request...');
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Send credentials in request body
        credentials: 'include', // Include cookies for session
    });

      console.log('Response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Login response:', data); // Debug the response
        if (data.role === 'ROLE_ADMIN') {
          console.log('Navigating to admin profile...');
          navigate('/adminProfile'); // Navigate to admin profile
        } else if (data.role === 'ROLE_PLAYER'){
          console.log('Navigating to user profile...');
          navigate('/userProfile'); // Navigate to user profile
        } else {
            console.log('Unknown role:', data.role);
            setErrorMessage('Unknown user role.');
        }
      } else {
        const error = await response.text();
        console.log('Login error:', error);
        setErrorMessage(error || 'Invalid username or password.');
      }
    } catch (error) {
      console.error('Error during login:', error); // Debugging log
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        {errorMessage && <p className="error">{errorMessage}</p>} {/* Display error message if any */}
        <div className="input-box">
          <i className="fa fa-user" aria-hidden="true"></i>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update state on input change
            disabled={loading} // Disable input when loading
          />
        </div>
        <div className="input-box">
          <i className="fa fa-unlock-alt" aria-hidden="true"></i>
          <input
            type="password"
            name="password"
            placeholder="Password"
            pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$"
            title="Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update state on input change
            disabled={loading} // Disable input when loading
          />
        </div>
        <div className="input-box">
          <input
            type="submit"
            value={loading ? 'Logging in...' : 'Login'} // Show loading text during API call
            disabled={loading} // Disable button when loading
          />
        </div>
        <div className="links">
          <Link to="/password-reset">Forgot Password?</Link>
          <Link to="/register">Navigate to Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
