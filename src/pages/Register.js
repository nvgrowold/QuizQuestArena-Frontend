import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    address: "",
    role: "ROLE_PLAYER", // Default role
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Sending JSON data
        },
        body: JSON.stringify(formData), // Convert formData to JSON string
      });

      if (response.ok) {
        setSuccessMessage("Registration successful! Please log in.");
        setTimeout(() => navigate("/login"), 2000); // Navigate to login page after 2 seconds
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "An error occurred during registration.");
      }
    } catch (error) {
      setErrorMessage("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div>
    <Navbar />
    <div className='max-w-[1240px] mx-auto h-[70vh] items-center text-white flex justify-center bg-cover'>
      <div className='bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-2xl bg-transparent bg-opacity-10 relative'>
        
        <form onSubmit={handleSubmit}>
        <h1 className='text-4xl font-bold text-center mb-8'>Sign Up</h1>
          {loading && <p>Loading...</p>}
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}

          <div className="relative my-2">
            <input type='text' name="firstName" 
                value={formData.firstName}
                onChange={handleChange}
                required
                autoComplete="firstName"
                className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none dark:focus:border-[#00df9a] focus:outline-none focus:ring-0 focus:text-white focus:border-[#00df9a] peer z-10 cursor-pointer' 
                placeholder=''
            />
             <label htmlFor='' className='absolute text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#00df9a] peer-focus:dark:text-[#00df9a] peer-placeholder-shown:scale-100 peer-valid:scale-75 peer-valid:-translate-y-6'>First Name</label>
            </div>

          <div className="relative my-2">
            <input type='text'
                name="lastName" 
                value={formData.lastName}
                onChange={handleChange}
                required
                autoComplete="lastName"
                className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none dark:focus:border-[#00df9a] focus:outline-none focus:ring-0 focus:text-white focus:border-[#00df9a] peer z-10 cursor-pointer' 
                placeholder=''
            />
             <label htmlFor='' className='absolute text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#00df9a] peer-focus:dark:text-[#00df9a] peer-placeholder-shown:scale-100 peer-valid:scale-75 peer-valid:-translate-y-6'>Last Name</label>
          </div>

          <div className="relative my-2">
            <input 
                type='text' 
                name="username" 
                value={formData.username}
                onChange={handleChange}
                required
                autoComplete="username"
                className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none dark:focus:border-[#00df9a] focus:outline-none focus:ring-0 focus:text-white focus:border-[#00df9a] peer z-10 cursor-pointer' 
                placeholder=''
            />
               <label htmlFor='' className='absolute text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#00df9a] peer-focus:dark:text-[#00df9a] peer-placeholder-shown:scale-100 peer-valid:scale-75 peer-valid:-translate-y-6'>Username</label>
          </div>

          <div className="input-box relative my-2">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$"
              title="Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
              required
              autoComplete="password"
              className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none dark:focus:border-[#00df9a] focus:outline-none focus:ring-0 focus:text-white focus:border-[#00df9a] peer z-10 cursor-pointer' 
              placeholder=''
            />
            <label htmlFor='' className='absolute text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#00df9a] peer-focus:dark:text-[#00df9a] peer-placeholder-shown:scale-100 peer-valid:scale-75 peer-valid:-translate-y-6'>Password</label>
          </div>

          <div className="input-box relative my-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none dark:focus:border-[#00df9a] focus:outline-none focus:ring-0 focus:text-white focus:border-[#00df9a] peer z-10 cursor-pointer' 
              placeholder=''
            />
            <label htmlFor='' className='absolute text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#00df9a] peer-focus:dark:text-[#00df9a] peer-placeholder-shown:scale-100 peer-valid:scale-75 peer-valid:-translate-y-6'>Email</label>
          </div>

          <div className="input-box relative my-2">
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              autoComplete="phoneNumber"
              className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none dark:focus:border-[#00df9a] focus:outline-none focus:ring-0 focus:text-white focus:border-[#00df9a] peer z-10 cursor-pointer' 
              placeholder=''
            />
            <label htmlFor='' className='absolute text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#00df9a] peer-focus:dark:text-[#00df9a] peer-placeholder-shown:scale-100 peer-valid:scale-75 peer-valid:-translate-y-6'>Phone number</label>
          </div>

          <div className="input-box relative my-2">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              autoComplete="address"
              className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none dark:focus:border-[#00df9a] focus:outline-none focus:ring-0 focus:text-white focus:border-[#00df9a] peer z-10 cursor-pointer' 
              placeholder=''
             />
             <label htmlFor='' className='absolute text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#00df9a] peer-focus:dark:text-[#00df9a] peer-placeholder-shown:scale-100 peer-valid:scale-75 peer-valid:-translate-y-6'>Address</label>
          </div>

          <div className="input-box relative my-2">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none dark:focus:border-[#00df9a] focus:outline-none focus:ring-0 focus:text-white focus:border-[#00df9a] peer cursor-pointer"
            >
              <option
                value="ROLE_PLAYER"
                className="bg-[#52529d] text-white hover:bg-[#00df9a] focus:bg-[#00df9a]"
              >
                ROLE_PLAYER
              </option>
              <option
                value="ROLE_ADMIN"
                className="bg-[#52529d] text-white hover:bg-[#00df9a] focus:bg-[#00df9a]"
              >
                ROLE_ADMIN
              </option>
            </select>
            <label
              htmlFor=""
              className="absolute text-sm duration-300 transform -translate scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#00df9a] peer-focus:dark:text-[#00df9a] peer-placeholder-shown:scale-100 peer-valid:scale-75 peer-valid:-translate-y-6 cursor-pointer"
            >
              User Type
            </label>
          </div>

          <div className="input-box mt-4">
            <button type="submit" className='w-full mb-4 text-[18px] rounded bg-[#52529d] py-2 hover:bg-[#00df9a] transition-colors duration-300 cursor-pointer'
              value={loading ? 'Registering...' : 'Register'} // Show loading text during API call
              disabled={loading} // Disable button when loading
            >Register
            </button>
          </div>
          <div className="links text-xs flex justify-between items-center mt-4">
            <Link to="/" className="hover:text-[#00df9a]">Back to Home</Link>
            <Link to="/login" className="hover:text-[#00df9a]">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
  </div>
  );
};

export default Register;
