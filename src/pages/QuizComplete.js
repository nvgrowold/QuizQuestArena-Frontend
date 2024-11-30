import React, {useState, useEffect} from "react";
import { useLocation,Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
    <div>
      <Navbar />
      <div className="flex-1 overflow-y-auto max-w-[1240px] mx-auto h-[70vh] text-white flex flex-col items-center bg-cover">
        <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-2xl bg-transparent bg-opacity-10 relative w-full">
          <h1 className="text-3xl font-bold text-center text-white mb-8">
            Quiz Completed!
          </h1>
          <h2 className="text-2xl font-bold text-center text-[#00df9a] mb-4">
            Your Score: {finalScore} / {totalQuestions}
          </h2>

          {/* Feedback Section */}
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto border border-gray-700 rounded-lg shadow-md">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-gray-700 text-gray-400 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3">Question</th>
                  <th className="px-6 py-3">Your Answer</th>
                  <th className="px-6 py-3">Correct Answer</th>
                  <th className="px-6 py-3">Result</th>
                </tr>
              </thead>
              <tbody>
                {feedbackList && feedbackList.length > 0 ? (
                  feedbackList.map((feedback, index) => (
                    <tr
                      key={index}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
                      } hover:bg-gray-700`}
                    >
                      <td className="px-6 py-4">{feedback.questionText}</td>
                      <td className="px-6 py-4">
                        {feedback.playerAnswer || "No Answer"}
                      </td>
                      <td className="px-6 py-4">{feedback.correctAnswer}</td>
                      <td
                        className={`px-6 py-4 ${
                          feedback.correct
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {feedback.correct ? "Correct" : "Incorrect"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-gray-400"
                    >
                      No feedback available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Like Section */}
          <div className="mt-8 text-center">
            <p className="text-lg text-white">Did you enjoy this quiz?</p>
            <button
              onClick={handleLike}
              className="mt-4 bg-[#00df9a] text-gray-900 font-semibold py-2 px-4 rounded hover:bg-[#00b378] transition duration-300"
            >
              Like
            </button>
            <p className="mt-2 text-gray-400">Likes: {likes}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QuizComplete;
