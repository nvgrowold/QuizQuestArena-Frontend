import React, { useEffect, useState } from "react";
import NavbarAdmin from '../components/NavbarAdmin';
import Footer from '../components/Footer';

const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]); // Store quizzes
  const [selectedQuiz, setSelectedQuiz] = useState(null); // Store selected quiz for editing
  const [quizToDelete, setQuizToDelete] = useState(null); // Store quiz selected for deletion
  const [errorMessage, setErrorMessage] = useState(""); // Handle error messages
  const [successMessage, setSuccessMessage] = useState(""); // Handle success messages
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch quizzes on component load
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/quizzes/manage", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setQuizzes(data);
      } else {
        const error = await response.text();
        setErrorMessage(error || "Failed to fetch quizzes.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while fetching quizzes.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (quiz) => {
    setSelectedQuiz(quiz); // Set the quiz to be edited
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleDelete = async () => {
    if (!quizToDelete) return;

    try {
      const response = await fetch(`/api/quizzes/delete/${quizToDelete.id}`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setSuccessMessage("Quiz deleted successfully.");
        setQuizToDelete(null); // Close the delete confirmation modal
        fetchQuizzes(); // Refresh the quiz list
      } else {
        const error = await response.text();
        setErrorMessage(error || "Failed to delete quiz.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while deleting the quiz.");
    }
  };

  const handleCancelDelete = () => {
    setQuizToDelete(null); // Close the delete confirmation modal
  };

  const handleSave = async () => {
    if (!selectedQuiz) return;

    try {
      const response = await fetch("/api/quizzes/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedQuiz),
        credentials: "include",
      });

      if (response.ok) {
        setSuccessMessage("Quiz updated successfully.");
        setSelectedQuiz(null); // Close the modal
        fetchQuizzes(); // Refresh the quiz list
      } else {
        const error = await response.text();
        setErrorMessage(error || "Failed to update quiz.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while saving the quiz.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedQuiz((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <p className="text-[#00df9a]">Loading...</p>;

  return (
    <div>
      <NavbarAdmin />
      <div className="flex-1 overflow-y-auto max-w-[1240px] mx-auto h-[70vh] items-center text-white flex justify-center bg-cover">
        <div className="overflow-y-auto mt-auto bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-2xl bg-transparent bg-opacity-10 relative w-full">
          <h1 className="text-4xl font-bold text-center mb-8">Manage Quiz Tournaments</h1>
          {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
          {successMessage && <p className="text-text-[#00df9a] text-center mb-4">{successMessage}</p>}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">ID</th>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Category</th>
                  <th scope="col" className="px-6 py-3">Difficulty</th>
                  <th scope="col" className="px-6 py-3">Start Date</th>
                  <th scope="col" className="px-6 py-3">End Date</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {quizzes.map((quiz) => (
                  <tr className="border-b border-gray-700" key={quiz.id}>
                    <td className="px-6 py-4">{quiz.id}</td>
                    <td className="px-6 py-4">{quiz.name}</td>
                    <td className="px-6 py-4">{quiz.category}</td>
                    <td className="px-6 py-4">{quiz.difficulty}</td>
                    <td className="px-6 py-4">{quiz.startDate}</td>
                    <td className="px-6 py-4">{quiz.endDate}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEdit(quiz)}
                        className="text-[#00df9a] hover:underline mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setQuizToDelete(quiz)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Quiz Modal */}
        {selectedQuiz && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-slate-800 border border-slate-600 rounded-lg p-6 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-95 w-[90%] max-w-lg">
              <h2 className="text-2xl font-bold text-[#00df9a] mb-4 text-center">Edit Quiz</h2>
              <div className="space-y-4">
                <div className="relative my-4">
                  <input
                    type="text"
                    name="name"
                    value={selectedQuiz.name}
                    onChange={handleInputChange}
                    className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none focus:outline-none focus:ring-0 focus:border-[#00df9a] peer"
                    placeholder=" "
                  />
                  <label className="absolute text-sm text-gray-400 transform scale-75 -translate-y-6 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Quiz Name
                  </label>
                </div>
                <div className="relative my-4">
                  <input
                    type="datetime-local"
                    name="startDate"
                    value={selectedQuiz.startDate}
                    onChange={handleInputChange}
                    className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none focus:outline-none focus:ring-0 focus:border-[#00df9a] peer"
                    placeholder=" "
                  />
                  <label className="absolute text-sm text-gray-400 transform scale-75 -translate-y-6 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Start Date
                  </label>
                </div>
                <div className="relative my-4">
                  <input
                    type="datetime-local"
                    name="endDate"
                    value={selectedQuiz.endDate}
                    onChange={handleInputChange}
                    className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none focus:outline-none focus:ring-0 focus:border-[#00df9a] peer"
                    placeholder=" "
                  />
                  <label className="absolute text-sm text-gray-400 transform scale-75 -translate-y-6 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    End Date
                  </label>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleSave}
                    className="w-full text-[18px] bg-[#00df9a] text-white py-2 px-4 rounded-lg hover:bg-[#00b378] transition-colors duration-300"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setSelectedQuiz(null)}
                    className="w-full text-[18px] bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {quizToDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-slate-800 border border-slate-600 rounded-lg p-6 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-95 w-[90%] max-w-lg">
              <h2 className="text-2xl font-bold text-red-500 mb-4 text-center">Delete Quiz</h2>
              <p className="text-gray-200 text-center mb-6">
                Are you sure you want to delete the quiz "<span className="text-[#00df9a]">{quizToDelete.name}</span>"?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleDelete}
                  className="w-full text-[18px] bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300"
                >
                  Delete
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="w-full text-[18px] bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      <Footer />
    </div>
  );
};


export default ManageQuizzes;
