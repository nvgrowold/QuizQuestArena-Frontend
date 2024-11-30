import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
  const [isCorrect, setIsCorrect] = useState(null); // Add a state for isCorrect

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
    const answer = formData.get("answer").trim();
    console.log("Submitted Answer:", answer); // Log the submitted answer
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
        console.log("Response from submitAnswer API:", data); // Log the response from the API
        setFeedbackMessage(data.feedbackMessage);
        setIsCorrect(data.isCorrect); // Update isCorrect
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
        // Fetch completion data from the backend
    try {
        const response = await fetch(`/api/quizzes/play/${quizId}/complete`, {
          method: "GET",
          credentials: "include",
        });
  
        if (response.ok) {
          const data = await response.json();
        // Navigate to the completion page
            navigate(`/quizComplete`, { 
                state: {
                finalScore: data.finalScore,
                totalQuestions: data.totalQuestions,
                feedbackList: data.feedbackList,
                quizId: quizId,
            },
        });
      }else {
        console.error("Failed to fetch quiz completion data.");
      }
    } catch (error) {
      console.error("Error completing quiz:", error);
    }
  }
};

  if (!quiz || !question) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="quiz-container max-w-[800px] mx-auto h-[55vh] my-16 p-6 bg-gray-800 rounded-md shadow-lg text-white">
        <h1 className="text-3xl font-bold my-4 text-center text-[#00df9a]">{quiz.name}</h1>
        <p className="text-lg mb-4 text-center">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </p>
    
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="mb-4 text-lg text-[#00d4ff]">{question.text}</p>
          <ul className="space-y-2 mb-4">
            {question.options.map((option, index) => (
              <li key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="answer"
                  value={option.optionText} // Use optionText from OptionsDTO
                  required
                  disabled={answerSubmitted}
                  className="w-4 h-4 text-[#00df9a] focus:ring-[#00df9a] focus:ring-2"
                />
                <label
                  htmlFor={`option-${index}`}
                  className="text-gray-300 cursor-pointer"
                >
                  {option.optionText}
                </label>
              </li>
            ))}
          </ul>
          {!answerSubmitted && (
            <button
              type="submit"
              className='w-full mt-8 text-[18px] rounded bg-[#52529d] py-2 hover:bg-[#00df9a] transition-colors duration-300 cursor-pointer'
            >
              Submit Answer
            </button>
          )}
        </form>
    
        {feedbackMessage && (
          <div className="mb-2 text-center">
            <p className={isCorrect ? "text-[#00d4ff]" : "text-[#d7788b]"}>{feedbackMessage}</p>
            <button
              onClick={handleNextQuestion}
              className='w-full my-4 text-[18px] rounded bg-[#52529d] py-2 hover:bg-[#00df9a] transition-colors duration-300 cursor-pointer'
            >
              {currentQuestionIndex + 1 < totalQuestions ? "Next Question" : "Finish Quiz"}
            </button>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );  
};

export default PlayQuiz;
