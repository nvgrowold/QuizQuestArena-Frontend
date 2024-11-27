import React from "react";
import { useLocation,Link } from "react-router-dom";

const QuizComplete = () => {
    const location = useLocation();
    const { finalScore = 0, totalQuestions = 0, feedbackList = [], quizId } = location.state || {};
    console.log("Feedback List:", feedbackList);

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
              <td>{feedback.question}</td>
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

      {/* Like/Dislike Section */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const likeValue = formData.get("like");
          console.log("Like value:", likeValue);
        }}
      >
        <p>Did you enjoy this quiz?</p>
        <button type="submit" name="like" value="true">
          Like
        </button>
      </form>

      {/* Back to Quizzes Link */}
      <Link to="/viewAllQuizzes">Go Back to Quizzes</Link>
    </div>
  );
};

export default QuizComplete;
