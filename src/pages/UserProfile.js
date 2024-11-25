import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null); // For profile picture upload
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
      const formData = new FormData();
      formData.append("user", JSON.stringify(user)); // Add user details
      if (profilePicture) {
        formData.append("profilePicture", profilePicture); // Add profile picture
      }

      const response = await fetch(`/api/users/updateProfile/${user.id}`, {
        method: "POST",
        body: formData,
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
      console.error("Logout failed:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="form">
      {user ? (
        <form onSubmit={handleSave}>
          <h1>Player Profile</h1>
          {successMessage && <p className="success">{successMessage}</p>}
          {errorMessage && <p className="error">{errorMessage}</p>}
          <label>User ID:</label>
          <input type="text" value={user.id} readOnly />
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
            required
          />
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
            required
          />
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
            required
          />
          <label>Email:</label>
          <input type="email" value={user.email} readOnly />
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleInputChange}
          />
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleInputChange}
          />
          <label>Role:</label>
          <input type="text" value={user.role} readOnly />
          <label>Profile Picture:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button type="submit" className="save-button">
            Save
          </button>

          <div>
            <Link to="/viewAllQuizzes">View All Quizzes</Link>
            <Link to="/quizScoresPage">View Scores</Link>
          </div>

          <button type="button" onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </form>
      ) : (
        <p>{errorMessage}</p>
      )}
    </div>
  );
}

export default UserProfile;
