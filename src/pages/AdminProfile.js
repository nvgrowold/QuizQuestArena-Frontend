import React, { useEffect, useState } from 'react';
import NavbarAdmin from "../components/NavbarAdmin";
import Footer from "../components/Footer";

function AdminProfile() {
  const [user, setUser] = useState(null); // State to store user data
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [successMessage, setSuccessMessage] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); // State to store uploaded profile picture
  const [loading, setLoading] = useState(false); // State to manage loading state

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

  if (loading) return <p>Loading...</p>;

  
  return (
    <div>
      <NavbarAdmin />
      <div className="max-w-[1240px] mx-auto min-h-[70vh] text-white flex items-center justify-center bg-cover">
        <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-2xl bg-transparent bg-opacity-10 relative w-full max-w-5xl">
          <h1 className="text-2xl font-bold text-center mb-8">Admin Profile</h1>
          {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
          {user ? (
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - Personal Information */}
                <div>
                  <h2 className="text-lg font-bold mb-4">Personal Information</h2>
                  <div className="relative my-4">
                    <input
                      type="text"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleInputChange}
                      required
                      className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none focus:outline-none focus:ring-0 focus:border-[#00df9a] cursor-pointer"
                    />
                    <label className="absolute text-sm text-gray-300 transform scale-75 -translate-y-6 top-3 -z-10 origin-[0]">
                      First Name
                    </label>
                  </div>

                  <div className="relative my-4">
                    <input
                      type="text"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleInputChange}
                      required
                      className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none focus:outline-none focus:ring-0 focus:border-[#00df9a] cursor-pointer"
                    />
                    <label className="absolute text-sm text-gray-300 transform scale-75 -translate-y-6 top-3 -z-10 origin-[0]">
                      Last Name
                    </label>
                  </div>

                  <div className="relative my-4">
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className="block w-full py-2.5 px-0 text-sm text-gray-300 bg-transparent border-0 border-b-2 border-[#52529d] appearance-none focus:outline-none focus:ring-0 cursor-not-allowed"
                    />
                    <label className="absolute text-sm text-gray-300 transform scale-75 -translate-y-6 top-3 -z-10 origin-[0]">
                      Email
                    </label>
                  </div>

                  <div className="relative my-4">
                    <input
                      type="text"
                      name="phoneNumber"
                      value={user.phoneNumber}
                      onChange={handleInputChange}
                      className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none focus:outline-none focus:ring-0 focus:border-[#00df9a] cursor-pointer"
                    />
                    <label className="absolute text-sm text-gray-300 transform scale-75 -translate-y-6 top-3 -z-10 origin-[0]">
                      Phone Number
                    </label>
                  </div>

                  <div className="relative my-4">
                    <input
                      type="text"
                      name="address"
                      value={user.address}
                      onChange={handleInputChange}
                      className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none focus:outline-none focus:ring-0 focus:border-[#00df9a] cursor-pointer"
                    />
                    <label className="absolute text-sm text-gray-300 transform scale-75 -translate-y-6 top-3 -z-10 origin-[0]">
                      Address
                    </label>
                  </div>
                </div>

                {/* Right Column - Account Information */}
                <div>
                  <h2 className="text-lg font-bold mb-4">Account Information</h2>
                  <div className="relative my-4">
                    <input
                      type="text"
                      value={user.id}
                      readOnly
                      className="block w-full py-2.5 px-0 text-sm text-gray-300 bg-transparent border-0 border-b-2 border-[#52529d] appearance-none focus:outline-none focus:ring-0 cursor-not-allowed"
                    />
                    <label className="absolute text-sm text-gray-300 transform scale-75 -translate-y-6 top-3 -z-10 origin-[0]">
                      User ID
                    </label>
                  </div>

                  <div className="relative my-4">
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInputChange}
                      required
                      className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none focus:outline-none focus:ring-0 focus:border-[#00df9a] cursor-pointer"
                    />
                    <label className="absolute text-sm text-gray-300 transform scale-75 -translate-y-6 top-3 -z-10 origin-[0]">
                      Username
                    </label>
                  </div>

                  <div className="relative my-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-300"
                    />
                    <label className="absolute text-sm text-gray-300 transform scale-75 -translate-y-6 top-3 -z-10 origin-[0] cursor-pointer">                    </label>
                  </div>

                  <div className="relative my-4">
                    <input
                      type="text"
                      value={user.role}
                      readOnly
                      className="block w-full py-2.5 px-0 text-sm text-gray-300 bg-transparent border-0 border-b-2 border-[#52529d] appearance-none focus:outline-none focus:ring-0 cursor-not-allowed"
                    />
                    <label className="absolute text-sm text-gray-300 transform scale-75 -translate-y-6 top-3 -z-10 origin-[0]">
                      Role
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mb-4 text-[18px] rounded bg-[#52529d] py-2 hover:bg-[#00df9a] transition-colors duration-300"
              >
                Save
              </button>
            </form>
          ) : (
            <p className="text-center text-red-500">{errorMessage}</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
} 

export default AdminProfile;
