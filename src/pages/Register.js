import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    address: "",
    role: "ROLE_PLAYER",
    profilePicture: null,
  });

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profilePicture: e.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle file upload
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await fetch("/register", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("Registration successful!");
        navigate("/"); // Redirect to the main page
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Register</h2>
        <div className="input-box">
          <i className="fa fa-user" aria-hidden="true"></i>
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
          <i className="fa fa-user" aria-hidden="true"></i>
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
          <i className="fa fa-user" aria-hidden="true"></i>
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
          <i className="fa fa-unlock-alt" aria-hidden="true"></i>
          <input
            type="password"
            name="password"
            placeholder="Password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$"
            title="Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-box">
          <i className="fa fa-user" aria-hidden="true"></i>
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
          <i className="fa fa-user" aria-hidden="true"></i>
          <input
            type="text"
            name="phoneNumber"
            placeholder="0064205557777"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <i className="fa fa-user" aria-hidden="true"></i>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <i className="fa fa-user" aria-hidden="true"></i>
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
          <i className="fa fa-user" aria-hidden="true"></i>
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div className="input-box">
          <input type="submit" value="Register" />
        </div>
        <a href="/" onClick={() => navigate("/")}>
          Navigate to main
        </a>
      </form>
    </div>
  );
};

export default Register;
