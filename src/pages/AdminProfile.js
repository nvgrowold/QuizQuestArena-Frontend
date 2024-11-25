import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminProfile() {
  const [user, setUser] = useState(null); // State to store user data
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [profilePicture, setProfilePicture] = useState(null); // State to store uploaded profile picture
  const navigate = useNavigate();

  // Fetch admin profile data on component load
  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await fetch('/api/users/adminProfile', {
          method: 'GET',
          credentials: 'include', // Include cookies for session handling
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data); // Set user data to state
        } else {
          const error = await response.text();
          setErrorMessage(error);
        }
      } catch (error) {
        setErrorMessage('An error occurred while fetching the profile.');
      }
    };

    fetchAdminProfile();
  }, []);

  // Handle changes to text input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle file input for profile picture
  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]); // Update state with selected file
  };

  // Save updated profile, including the profile picture
  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Create FormData to handle file uploads
    Object.keys(user).forEach((key) => {
      formData.append(key, user[key]); // Add user data to FormData
    });

    if (profilePicture) {
      formData.append('profilePicture', profilePicture); // Add profile picture if present
    }

    try {
      const response = await fetch(`/api/users/updateProfile/${user.id}`, {
        method: 'POST',
        body: formData,
        credentials: 'include', // Include cookies for session handling
      });

      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        const error = await response.text();
        setErrorMessage(error);
      }
    } catch (error) {
      setErrorMessage('An error occurred while saving the profile.');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies for session handling
      });
      navigate('/'); // Redirect to home after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="form">
      {user ? (
        <form onSubmit={handleSave}>
          <h1>Admin Profile</h1>
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
            required
          />
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleInputChange}
            required
          />
          <label>Role:</label>
          <input type="text" value={user.role} readOnly />
          <label>Profile Picture:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange} // Handle file selection
          />

          <button type="submit" className="save-button">
            Save
          </button>

          <div>
            <a href="/quizScoresPage">View Quiz Scores</a>
            <a href="/create-quiz">Create A New Quiz Tournament</a>
            <a href="/manage-quizzes">Manage All Quiz Tournaments</a>
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

export default AdminProfile;
