import React, { useState, useEffect } from "react";

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
    return <p>Loading quiz scores...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="quiz-scores">
      <h1>All Quiz Scores</h1>
      {scores.length === 0 ? (
        <p>No scores available yet. Participate in a quiz to see results here!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Quiz ID</th>
              <th>Quiz Name</th>
              <th>Total Players</th>
              <th>Average Score</th>
              <th>Likes</th>
              <th>Player ID</th>
              <th>Player Name</th>
              <th>Completed Date</th>
              <th>Player's Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score) => (
              <tr key={score.quizId}>
                <td>{score.quizId}</td>
                <td>{score.quizName}</td>
                <td>{score.totalPlayers}</td>
                <td>{score.averageScore}</td>
                <td>{score.likes}</td>
                <td>{score.playerId}</td>
                <td>{score.playerName}</td>
                <td>{new Date(score.completedDate).toLocaleString()}</td>
                <td>{score.playerScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default QuizScoresRanking;
