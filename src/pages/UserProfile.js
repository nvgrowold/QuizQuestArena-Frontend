import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/UserProfile.css";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  // Fetch user data on component load
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/users/userProfile", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          const error = await response.text();
          setErrorMessage(error || "Failed to fetch user profile.");
        }
      } catch (error) {
        setErrorMessage("An error occurred while fetching the profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSuccessMessage("");
    setErrorMessage("");
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle profile picture selection
  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  // Save updated profile
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });

      if (response.ok) {
        setSuccessMessage("Profile updated successfully!");
      } else {
        const error = await response.text();
        setErrorMessage(error || "Failed to update profile.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while saving the profile.");
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch("/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/");
    } catch (error) {
      setErrorMessage("Failed to log out.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="user-profile-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">User profile</h2>
        {/* Profile Fields */}
        <div>
              <label>User ID:</label>
              <input
                type="text"
                value={user.id}
                readOnly
                className="input read-only"
              />
            </div><br></br>
        <button 
          className="sidebar-button"
          onClick={() => navigate("/viewAllQuizzes")}
        >
          View All Quizzes
        </button>
        <button 
          className="sidebar-button"
          onClick={() => navigate("/quizScoresRanking")}
        >
          Quiz Scores Ranking
        </button>
        <button 
          className="sidebar-button logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Main Form Section */}
      <div className="form-container">
        {user ? (
          <form onSubmit={handleSave} className="form">

            {/* Success and Error Messages */}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="error-message">{errorMessage}</p>
            )}

            
            <div>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                className="input"
                required
              />
            </div>
            <div>
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleInputChange}
                className="input"
                required
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleInputChange}
                className="input"
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="input read-only"
              />
            </div>
            <div>
              <label>Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleInputChange}
                className="input"
              />
            </div>
            <div>
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleInputChange}
                className="input"
              />
            </div>
            <div>
              <label>Role:</label>
              <input
                type="text"
                value={user.role}
                readOnly
                className="input read-only"
              />
            </div>

            {/* Additional Fields */}
           

            {/* Profile Picture */}
            <div>
              <label>Profile Picture:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="input"
              />
            </div>
<br></br>
            {/* Save Button */}
            <button type="submit" className="button primary-button">
              Save
            </button>
          </form>
        ) : (
          <p className="error-message">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
