import React, {useState, useEffect} from "react";
import { useLocation,Link } from "react-router-dom";

const QuizComplete = () => {
    const location = useLocation();
    const { finalScore = 0, totalQuestions = 0, feedbackList = [], quizId } = location.state || {};
    console.log("Feedback List:", feedbackList);
    const [likes, setLikes] = useState(0);

    // Fetch initial like count (optional)
    useEffect(() => {
      const fetchLikes = async () => {
          try {
              const response = await fetch(`/api/quizzes/${quizId}/likes`);
              if (!response.ok) throw new Error("Failed to fetch likes.");
              const likeCount = await response.json();
              setLikes(likeCount);
          } catch (error) {
              console.error("Error fetching likes:", error);
          }
      };
      fetchLikes();
  }, [quizId]);

    const handleLike = async () => {
      try {
          const response = await fetch(`/api/quizzes/${quizId}/like-dislike?like=true`, {
              method: "POST",
          });
          if (!response.ok) throw new Error("Failed to like the quiz.");
          const updatedLikes = await response.json();
          setLikes(updatedLikes); // Update likes dynamically
      } catch (error) {
          console.error("Error liking quiz:", error);
      }
  };

  return (
    <div className="quiz-complete-container">
      <h1>Quiz Completed!</h1>

      {/* Display the final score */}
      <h2>
        Your Score: {finalScore} / {totalQuestions}
      </h2>

      {/* Feedback Section */}
      <h3>Review Your Answers:</h3>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Your Answer</th>
            <th>Correct Answer</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
        {feedbackList && feedbackList.length > 0 ? (
          feedbackList.map((feedback, index) => (
            <tr key={index}>
              <td>{feedback.questionText}</td>
              <td>{feedback.playerAnswer || "No Answer"}</td>
              <td>{feedback.correctAnswer}</td>
              <td>{feedback.correct ? "Correct" : "Incorrect"}</td>
            </tr>
          ))
        ) : (
            <tr>
              <td colSpan="4">No feedback available</td>
            </tr>
        )}
        </tbody>
      </table>

      {/* Like Section */}
      <p>Did you enjoy this quiz?</p>
      <button onClick={handleLike}>Like</button>
      <p>Likes: {likes}</p>

      {/* Back to Quizzes Link */}
      <Link to="/viewAllQuizzes">Go Back to Quizzes</Link>
    </div>
  );
};

export default QuizComplete;
