import React, { useState } from "react";
import axios from "axios";
import { Link,useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post("/api/password/reset-password", {
        token,
        password,
        confirmPassword,
      });
      setSuccessMessage(response.data.successMessage);
    } catch (error) {
      setErrorMessage(error.response?.data?.errorMessage || "Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-[1240px] mx-auto h-[70vh] items-center text-white flex justify-center bg-cover">
        <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-2xl bg-transparent bg-opacity-10 relative">
          <form onSubmit={handleSubmit}>
            <h1 className="text-4xl font-bold text-center mb-8">Reset Password</h1>
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

            <div className="relative my-4">
              <input
                type="password"
                id="password"
                name="password"
                pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$"
                title="Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none dark:focus:border-[#00df9a] focus:outline-none focus:ring-0 focus:text-white focus:border-[#00df9a] peer cursor-pointer"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute text-sm duration-300 transform scale-75 -translate-y-6 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-valid:scale-75 peer-valid:-translate-y-6 peer-focus:text-[#00df9a]"
              >
                New Password
              </label>
            </div>

            <div className="relative my-4">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none dark:focus:border-[#00df9a] focus:outline-none focus:ring-0 focus:text-white focus:border-[#00df9a] peer cursor-pointer"
                placeholder=" "
              />
              <label
                htmlFor="confirmPassword"
                className="absolute text-sm duration-300 transform scale-75 -translate-y-6 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-valid:scale-75 peer-valid:-translate-y-6 peer-focus:text-[#00df9a]"
              >
                Confirm Password
              </label>
            </div>

            <div className="input-box mt-8">
              <button
                type="submit"
                className="w-full mb-4 text-[18px] rounded bg-[#52529d] py-2 hover:bg-[#00df9a] transition-colors duration-300 cursor-pointer"
              >
                Reset Password
              </button>
            </div>
            <div className="links text-xs flex justify-between items-center mt-4">
            <Link to="/" className="hover:text-[#00df9a]">Back to Home</Link>
            <Link to="/login" className="hover:text-[#00df9a]">Back to Login</Link>
          </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
