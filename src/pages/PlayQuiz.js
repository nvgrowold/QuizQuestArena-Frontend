import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PlayQuiz = () => {
  const { quizId } = useParams(); // Get the quiz ID from the URL
  console.log("Playing quiz with ID:", quizId);
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [question, setQuestion] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  // Fetch the quiz and questions on load
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`/api/quizzes/play/${quizId}`, {
          method: "GET",
          credentials: "include",
        });
        const rawResponse = await response.text(); // Fetch raw text
        console.log("Raw backend response:", rawResponse);

        if (response.ok) {
          const data = JSON.parse(rawResponse); // Parse as JSON
          console.log("Parsed response:", data);
          setQuiz(data.quiz);
          setQuestion(data.question);
          setTotalQuestions(data.totalQuestions);
        } else {
            console.error(`Failed to load quiz: ${response.status}`);
          }
        } catch (error) {
          console.error("Error loading quiz:", error);
        }
      };

    fetchQuiz();
  }, [quizId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const answer = formData.get("answer");
    try {
      const response = await fetch(`/api/quizzes/play/${quizId}/question/${currentQuestionIndex}/submit`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({answer}),
            credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFeedbackMessage(data.feedbackMessage);
        setAnswerSubmitted(true);
      } else {
        console.error("Failed to submit answer.");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const handleNextQuestion = async() => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < totalQuestions) {
        try {
          const response = await fetch(`/api/quizzes/play/${quizId}/question/${nextIndex}`,
            {
                method: "GET",
                credentials: "include",
            }
        );
  
          if (response.ok) {
            const data = await response.json();
            setQuestion(data.question);
            setCurrentQuestionIndex(nextIndex);
            setFeedbackMessage("");
            setAnswerSubmitted(false); // Reset answer state for next question
          } else {
            console.error(`Failed to load question ${nextIndex}: ${response.status}`);
          }
        } catch (error) {
          console.error("Error loading next question:", error);
        }
      } else {
        // Navigate to the completion page
        navigate(`/quizzes/play/${quizId}/complete`);
      }
    };

  if (!quiz || !question) return <p>Loading...</p>;

  return (
    <div className="quiz-container">
      <h1 className="text-2xl font-bold mb-4">{quiz.name}</h1>
      <p>
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </p>

      <form onSubmit={handleSubmit}>
        <p className="mb-4">{question.text}</p>
        <ul>
          {question.options.map((option, index) => (
            <li key={index}>
              <input
                type="radio"
                id={`option-${index}`}
                name="answer"
                value={option.optionText} // Use optionText from OptionsDTO
                required
                disabled={answerSubmitted}
              />
              <label htmlFor={`option-${index}`}>{option.optionText}</label>
            </li>
          ))}
        </ul>
        {!answerSubmitted && (
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Submit Answer
          </button>
        )}
      </form>

      {feedbackMessage && (
        <div className="mt-4">
          <p className="text-green-500">{feedbackMessage}</p>
          <button
            onClick={handleNextQuestion}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            {currentQuestionIndex + 1 < totalQuestions ? "Next Question" : "Finish Quiz"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayQuiz;
