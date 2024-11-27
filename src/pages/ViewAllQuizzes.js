import React, { useState, useEffect } from "react";

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
    <div>
      <h2>{title}</h2>
      {quizList.length === 0 ? (
        <p>No {title.toLowerCase()} at the moment.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Quiz ID</th>
              <th>Quiz Name</th>
              <th>Category</th>
              <th>Difficulty</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Likes</th>
              <th>Total Participants</th>
              {showPlayButton && <th>Play Now</th>}
            </tr>
          </thead>
          <tbody>
            {quizList.map((quiz) => (
              <tr key={quiz.id}>
                <td>{quiz.id}</td>
                <td>{quiz.name}</td>
                <td>{quiz.category || "N/A"}</td>
                <td>{quiz.difficulty || "N/A"}</td>
                <td>{quiz.startDate ? new Date(quiz.startDate).toLocaleString() : "N/A"}</td>
                <td>{quiz.endDate ? new Date(quiz.endDate).toLocaleString() : "N/A"}</td>
                <td>{quiz.likes || 0}</td>
                <td>{quiz.totalParticipants || 0}</td>
                {showPlayButton && (
                  <td>
                    <a href={`/quizzes/play/${quiz.id}`} className="join-button">
                      Join
                    </a>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <div className="view-all-quizzes">
      <h1>View All Quizzes</h1>
      {renderTable(quizzes.ongoingQuizzes, "Ongoing Quizzes", true)}
      {renderTable(quizzes.upcomingQuizzes, "Upcoming Quizzes")}
      {renderTable(quizzes.pastQuizzes, "Past Quizzes")}
      {renderTable(quizzes.participatedQuizzes, "Participated Quizzes")}
    </div>
  );
};

export default ViewAllQuizzes;
