import React, { useEffect, useState } from "react";

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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="manage-quizzes">
      <h1 className="text-2xl font-bold mb-4">Manage Quiz Tournaments</h1>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Difficulty</th>
            <th className="border border-gray-300 px-4 py-2">Start Date</th>
            <th className="border border-gray-300 px-4 py-2">End Date</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz.id}>
              <td className="border border-gray-300 px-4 py-2">{quiz.id}</td>
              <td className="border border-gray-300 px-4 py-2">{quiz.name}</td>
              <td className="border border-gray-300 px-4 py-2">{quiz.category}</td>
              <td className="border border-gray-300 px-4 py-2">{quiz.difficulty}</td>
              <td className="border border-gray-300 px-4 py-2">{quiz.startDate}</td>
              <td className="border border-gray-300 px-4 py-2">{quiz.endDate}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEdit(quiz)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => setQuizToDelete(quiz)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Quiz Modal */}
      {selectedQuiz && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Quiz</h2>
            <label className="block mb-2">
              Name:
              <input
                type="text"
                name="name"
                value={selectedQuiz.name}
                onChange={handleInputChange}
                className="block w-full border border-gray-300 px-2 py-1 rounded mb-2"
              />
            </label>
            <label className="block mb-2">
              Start Date:
              <input
                type="datetime-local"
                name="startDate"
                value={selectedQuiz.startDate}
                onChange={handleInputChange}
                className="block w-full border border-gray-300 px-2 py-1 rounded mb-2"
              />
            </label>
            <label className="block mb-2">
              End Date:
              <input
                type="datetime-local"
                name="endDate"
                value={selectedQuiz.endDate}
                onChange={handleInputChange}
                className="block w-full border border-gray-300 px-2 py-1 rounded mb-2"
              />
            </label>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
              <button
                onClick={() => setSelectedQuiz(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {quizToDelete && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Delete Quiz</h2>
            <p>Are you sure you want to delete the quiz "{quizToDelete.name}"?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageQuizzes;
