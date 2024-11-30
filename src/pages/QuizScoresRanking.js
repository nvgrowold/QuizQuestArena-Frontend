import React, { useState, useEffect } from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import Footer from "../components/Footer";

const QuizScoresRanking = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch scores from the REST API
    fetch("/api/quizzes/quizScoresRanking")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch quiz scores.");
        }
        return response.json();
      })
      .then((data) => {
        setScores(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-[#00df9a] text-center mt-4">Loading quiz scores...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  return (
    <div>
      <NavbarAdmin />
      <div className="flex-1 overflow-y-auto max-w-[1240px] mx-auto h-[70vh] items-center text-white flex justify-center bg-cover">
        <div className="overflow-y-auto mt-auto bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-2xl bg-transparent bg-opacity-10 relative w-full">
          <h1 className="text-4xl font-bold text-center mb-8">Quiz Scores Ranking</h1>
          {scores.length === 0 ? (
            <p className="text-center text-gray-400">
              No scores available yet. Participate in a quiz to see results here!
            </p>
          ) : (
            <div className="overflow-x-auto overflow-y-auto">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                  <tr>
                    <th className="px-6 py-3">Quiz ID</th>
                    <th className="px-6 py-3">Quiz Name</th>
                    <th className="px-6 py-3">Total Players</th>
                    <th className="px-6 py-3">Average Score</th>
                    <th className="px-6 py-3">Likes</th>
                    <th className="px-6 py-3">Player ID</th>
                    <th className="px-6 py-3">Player Name</th>
                    <th className="px-6 py-3">Completed Date</th>
                    <th className="px-6 py-3">Player's Score</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((score) => (
                    <tr className="border-b border-gray-700" key={score.quizId}>
                      <td className="px-6 py-4">{score.quizId}</td>
                      <td className="px-6 py-4">{score.quizName}</td>
                      <td className="px-6 py-4">{score.totalPlayers}</td>
                      <td className="px-6 py-4">{score.averageScore}</td>
                      <td className="px-6 py-4">{score.likes}</td>
                      <td className="px-6 py-4">{score.playerId}</td>
                      <td className="px-6 py-4">{score.playerName}</td>
                      <td className="px-6 py-4">
                        {new Date(score.completedDate).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">{score.playerScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QuizScoresRanking;
