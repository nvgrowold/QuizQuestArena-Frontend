import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
    <div>
    <Navbar />
    <div className='max-w-[1240px] mx-auto h-[70vh] items-center text-white flex justify-center bg-cover'>

      {/* style={{"backgroundImage": "url('/assets/quiz-background.jpg')"}} */}
      <div className='bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-2xl bg-transparent bg-opacity-10 relative'>
        <form onSubmit={handleLogin}>
        <h1 className='text-4xl font-bold text-center mb-8'>Login</h1>
          {errorMessage && <p className="error">{errorMessage}</p>} {/* Display error message if any */}
          <div className="relative my-4">
            <input type='text'className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none dark:focus:border-[#00df9a] focus:outline-none focus:ring-0 focus:text-white focus:border-[#00df9a] peer' placeholder=''/>
            <label htmlFor='' className='absolute text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#00df9a] peer-focus:dark:text-[#00df9a] peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6'>Username</label>
          </div>
          <div className="relative my-8">
          <input type='password'className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none dark:focus:border-[#00df9a] focus:outline-none focus:ring-0 focus:text-white focus:border-[#00df9a] peer' placeholder=''
              pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$" 
              title="Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state on input change
              disabled={loading} // Disable input when loading
              />
                <label htmlFor='' className='absolute text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#00df9a] peer-focus:dark:text-[#00df9a] peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6'>Your Password</label>
          </div>
          <div className="input-box mt-8">
            <input
              type="submit"
              className='w-full mb-4 text-[18px] rounded bg-[#52529d] py-2 hover:bg-[#00df9a] transition-colors duration-300 cursor-pointer'
              value={loading ? 'Logging in...' : 'Login'} // Show loading text during API call
              disabled={loading} // Disable button when loading
            />
          </div>
          <div className="links text-xs flex justify-between items-center mt-4">
            <Link to="/password-reset" className="hover:text-[#00df9a]">Forgot Password?</Link>
            <Link to="/register" className="hover:text-[#00df9a]">Navigate to Register</Link>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
  </div>
  );
}

export default Login;
