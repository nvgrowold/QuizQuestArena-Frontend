import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminProfile() {
  const [user, setUser] = useState(null); // State to store user data
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [successMessage, setSuccessMessage] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); // State to store uploaded profile picture
  const [loading, setLoading] = useState(false); // State to manage loading state
  const navigate = useNavigate();

  // Fetch admin profile data on component load
  useEffect(() => {
    const fetchAdminProfile = async () => {
      console.log('Fetching user profile...');
      setLoading(true);
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
      } finally {
      setLoading(false); // Stop loading
      }
    };

    fetchAdminProfile();
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

  // Handle file input for profile picture
  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]); // Update state with selected file
  };

  // Save updated profile, including the profile picture
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state
    setErrorMessage(''); // Clear previous error message
    setSuccessMessage("");

    // const formData = new FormData(); // Create FormData to handle file uploads
    // Object.keys(user).forEach((key) => {
    //   formData.append(key, user[key]); // Add user data to FormData
    // });

    // if (profilePicture) {
    //   formData.append('profilePicture', profilePicture); // Add profile picture if present
    // }

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
        },
        body: JSON.stringify(user), // Convert user object to JSON
        credentials: 'include', // Include cookies for session handling
      });

      if (response.ok) {
        setSuccessMessage("Profile updated successfully!");
      } else {
        const error = await response.text();
        setErrorMessage(error || "Failed to update profile.");
      }
    } catch (error) {
      setErrorMessage('An error occurred while saving the profile.');
    }finally {
      setLoading(false); // Stop loading
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
  if (loading) return <p>Loading...</p>;

  return (
    <div className="form flex justify-center items-center min-h-screen bg-gray-100">
      {user ? (
        <form 
          onSubmit={handleSave} 
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <h1 className="text-2xl font-bold text-center mb-4">Admin Profile</h1>
           {/* Success and Error Messages */}
           {successMessage && <p className="text-green-500 text-center font-semibold">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 text-center font-semibold">{errorMessage}</p>}

          <div>
            <label className="block text-gray-700 font-semibold mb-1">User ID:</label>
            <input 
              type="text" 
              value={user.id} 
              readOnly 
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Username:</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-1">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email:</label>
            <input 
              type="email" 
              value={user.email} 
              readOnly 
              className="w-full px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Address:</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Role:</label>
            <input 
              type="text" 
              value={user.role} 
              readOnly 
              className="w-full px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Profile Picture:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
          
          <div className="flex flex-col items-center space-y-2 mt-4">
            <Link 
              to="/quizScoresRanking" 
              className="text-blue-600 hover:underline"
            >
              View Quiz Scores Ranking
            </Link>
            <Link 
              to="/createQuiz" 
              className="text-blue-600 hover:underline"
            >
              Create A New Quiz Tournament
            </Link>
            <Link 
              to="/manageQuizzes" 
              className="text-blue-600 hover:underline"
            >
              Manage All Quiz Tournaments
            </Link>
          </div>
          
          <button 
            type="button" 
            onClick={handleLogout} 
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mt-4"
          >
            Logout
          </button>
        </form>
      ) : (
        <p className="text-center text-red-500">{errorMessage}</p>
      )}
    </div>

  );
}

export default AdminProfile;
