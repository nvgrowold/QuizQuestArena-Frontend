import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
      console.log('Fetching user profile...');
      setLoading(true);
      try {
        const response = await fetch("/api/users/userProfile", {
          method: "GET",
          credentials: "include",
        });

        console.log('Response status:', response.status);
        if (response.ok) {
          const data = await response.json();
          console.log('User profile data:', data); // Log the profile data
          setUser(data);
        } else {
          const error = await response.text();
          console.log('Error fetching profile:', error);
          setErrorMessage(error || "Failed to fetch user profile.");
        }
      } catch (error) {
        console.error('Error during profile fetch:', error); // Log unexpected errors
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
      // const formData = new FormData();
      // formData.append("user", JSON.stringify(user)); // Add user details
      // if (profilePicture) {
      //   formData.append("profilePicture", profilePicture); // Add profile picture
      // }

      const response = await fetch(`/api/users/${user.id}`, {
        method: "put",
        // body: formData,
        headers: {
          "Content-Type": "application/json", // Send JSON data
        },
        body: JSON.stringify(user), // Convert user object to JSON
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
    <div className="form flex justify-center items-center min-h-screen bg-gray-100">
      {user ? (
        <form 
          onSubmit={handleSave} 
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <h1 className="text-2xl font-bold text-center mb-4">Player Profile</h1>

          {/* Success and Error Messages */}
          {successMessage && <p className="text-green-500 text-center font-semibold">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 text-center font-semibold">{errorMessage}</p>}

          {/* User ID */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">User ID:</label>
            <input 
              type="text" 
              value={user.id} 
              readOnly 
              className="w-full px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Username */}
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

          {/* First Name */}
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

          {/* Last Name */}
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

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email:</label>
            <input 
              type="email" 
              value={user.email} 
              readOnly 
              className="w-full px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Address:</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Role:</label>
            <input 
              type="text" 
              value={user.role} 
              readOnly 
              className="w-full px-3 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Profile Picture:</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="w-full px-3 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Save Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>

          {/* Links */}
          <div className="flex flex-col items-center space-y-2 mt-4">
            <Link 
              to="/viewAllQuizzes" 
              className="text-blue-600 hover:underline"
            >
              View All Quizzes
            </Link>
            <Link to="/quizScoresRanking" 
              className="text-blue-600 hover:underline"
            >
              Quiz Scores Ranking
            </Link>
          </div>

          {/* Logout Button */}
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

export default UserProfile;
