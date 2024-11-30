import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ViewAllQuizzes = () => {
  const [quizzes, setQuizzes] = useState({
    ongoingQuizzes: [],
    upcomingQuizzes: [],
    pastQuizzes: [],
    participatedQuizzes: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch quiz data from REST API
    fetch("/api/quizzes/viewAllQuizzes", {
      method: "GET",
      credentials: "include", // Ensures session cookies are sent
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch quizzes. Please log in.");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Log response to check participants count
        // Safely set data with fallback to empty arrays
        setQuizzes({
          ongoingQuizzes: data.ongoingQuizzes || [],
          upcomingQuizzes: data.upcomingQuizzes || [],
          pastQuizzes: data.pastQuizzes || [],
          participatedQuizzes: data.participatedQuizzes || [],
        });
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading quizzes...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  const renderTable = (quizList = [], title, showPlayButton = false) => (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-center text-[#00df9a] mb-4">{title}</h2>
      {quizList.length === 0 ? (
        <p className="text-center text-gray-400">No {title.toLowerCase()} at the moment.</p>
      ) : (
        <div className="overflow-x-auto max-h-[300px] overflow-y-auto border border-gray-700 rounded-lg shadow-md">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-gray-700 text-gray-400 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3">Quiz ID</th>
                <th className="px-6 py-3">Quiz Name</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Difficulty</th>
                <th className="px-6 py-3">Start Date</th>
                <th className="px-6 py-3">End Date</th>
                <th className="px-6 py-3">Likes</th>
                <th className="px-6 py-3">Total Participants</th>
                {showPlayButton && <th className="px-6 py-3">Action</th>}
              </tr>
            </thead>
            <tbody>
              {quizList.map((quiz, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
                  } hover:bg-gray-700`}
                >
                  <td className="px-6 py-4">{quiz.id}</td>
                  <td className="px-6 py-4">{quiz.name}</td>
                  <td className="px-6 py-4">{quiz.category || "N/A"}</td>
                  <td className="px-6 py-4">{quiz.difficulty || "N/A"}</td>
                  <td className="px-6 py-4">
                    {quiz.startDate ? new Date(quiz.startDate).toLocaleString() : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {quiz.endDate ? new Date(quiz.endDate).toLocaleString() : "N/A"}
                  </td>
                  <td className="px-6 py-4">{quiz.likes || 0}</td>
                  <td className="px-6 py-4">{quiz.totalParticipants || 0}</td>
                  {showPlayButton && (
                    <td className="px-6 py-4">
                      <button className="text-[#00df9a] hover:underline">
                        Join
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="flex-1 overflow-y-auto max-w-[1240px] mx-auto h-[70vh] text-white flex flex-col items-center bg-cover">
        <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-2xl bg-transparent bg-opacity-10 relative w-full">
          <h1 className="text-4xl font-bold text-center text-white mb-8">View All Quizzes</h1>
          {renderTable(quizzes.ongoingQuizzes, "Ongoing Quizzes", true)}
          {renderTable(quizzes.upcomingQuizzes, "Upcoming Quizzes")}
          {renderTable(quizzes.pastQuizzes, "Past Quizzes")}
          {renderTable(quizzes.participatedQuizzes, "Participated Quizzes")}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewAllQuizzes;
