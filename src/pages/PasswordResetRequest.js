import React, { useState } from "react";
import axios from "axios";

const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    try {
      const response = await axios.post("/api/password/request-password-reset", { email });
      setSuccessMessage(response.data.successMessage);
    } catch (error) {
      setErrorMessage(error.response?.data?.errorMessage || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Password Reset</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default PasswordResetRequest;
