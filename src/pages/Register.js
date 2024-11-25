import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      const response = await fetch("http://localhost:8080/api/users/register", {
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
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {loading && <p>Loading...</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        <div className="input-box">
          <input
            type="text"
            name="firstName"
            placeholder="Firstname"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-box">
          <input
            type="text"
            name="lastName"
            placeholder="Lastname"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-box">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-box">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$"
            title="Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
            required
          />
        </div>

        <div className="input-box">
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-box">
          <input
            type="text"
            name="phoneNumber"
            placeholder="0064205557777"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="ROLE_PLAYER">Player</option>
            <option value="ROLE_ADMIN">Admin</option>
          </select>
        </div>

        <div className="input-box">
          <input type="submit" value="Register" disabled={loading} />
        </div>
        <a href="/">Navigate to main</a>
      </form>
    </div>
  );
};

export default Register;
