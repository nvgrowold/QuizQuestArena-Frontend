import React, { useState } from 'react';
import NavbarAdmin from '../components/NavbarAdmin';
import Footer from '../components/Footer';

const CreateQuiz = () => {
    const [quizData, setQuizData] = useState({
        name: '',
        category: 'Any Category',
        difficulty: 'Any difficulty',
        startDate: '',
        endDate: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Added loading state

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuizData({
            ...quizData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading state
        setMessage("");
        setError("");
        try {
            const response = await fetch('/api/quizzes/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token for authentication if needed
                },
                body: JSON.stringify(quizData),
            });

                // Check if the response is OK
    if (response.ok) {
        const contentType = response.headers.get("Content-Type");
  
        if (contentType && contentType.includes("application/json")) {
          const result = await response.json();
          setMessage(result.message || "Quiz created successfully!");
        } else {
          // Handle plain text or non-JSON response
          const result = await response.text();
          setMessage(result || "Quiz created successfully!");
        }
        setError("");
      } else {
        const contentType = response.headers.get("Content-Type");
  
        if (contentType && contentType.includes("application/json")) {
          const errorResult = await response.json();
          setError(errorResult.message || "Failed to create quiz.");
        } else {
          const errorText = await response.text();
          setError(errorText || "Failed to create quiz.");
        }
        setMessage("");
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

    return (
        <div>
          <NavbarAdmin />
          <div className="max-w-[1240px] mx-auto h-[70vh] items-center text-white flex justify-center bg-cover">
            <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-2xl bg-transparent bg-opacity-10 relative">
              <form onSubmit={handleSubmit}>
                <h1 className="text-4xl font-bold text-center mb-8">Create Quiz Tournament</h1>
                {loading && <p className="text-green-500">Loading...</p>}
                {message && <p className="text-green-500 text-center mb-4">{message}</p>}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
    
                <div className='w-full'>
                    <div className="relative my-4">
                    <input
                        type="text"
                        name="name"
                        value={quizData.name}
                        onChange={handleChange}
                        required
                        className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none focus:outline-none focus:ring-0 focus:border-[#00df9a] peer z-10 cursor-pointer"
                        placeholder=""
                    />
                    <label
                        htmlFor="name"
                        className="absolute text-sm duration-300 transform scale-75 -translate-y-6 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Quiz Name
                    </label>
                    </div>
        
                    <div className="relative my-4">
                    <select
                        name="category"
                        value={quizData.category}
                        onChange={handleChange}
                        required
                        className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none focus:outline-none focus:ring-0 focus:border-[#00df9a] peer cursor-pointer"
                    >
                        <option value="Any Category"className="bg-[#52529d] text-white hover:bg-[#00df9a] focus:bg-[#00df9a]">Any Category</option>
                        <option value="General Knowledge"className="bg-[#52529d] text-white hover:bg-[#00df9a] focus:bg-[#00df9a]">General Knowledge</option>
                        <option value="Entertainment: Books"className="bg-[#52529d] text-white hover:bg-[#00df9a] focus:bg-[#00df9a]">Entertainment: Books</option>
                        <option value="Science & Nature"className="bg-[#52529d] text-white hover:bg-[#00df9a] focus:bg-[#00df9a]">Science & Nature</option>
                        <option value="Science: Computers"className="bg-[#52529d] text-white hover:bg-[#00df9a] focus:bg-[#00df9a]">Science: Computers</option>
                        <option value="Science: Mathematics"className="bg-[#52529d] text-white hover:bg-[#00df9a] focus:bg-[#00df9a]">Science: Mathematics</option>
                        <option value="Sports"className="bg-[#52529d] text-white hover:bg-[#00df9a] focus:bg-[#00df9a]">Sports</option>
                        <option value="Geography"className="bg-[#52529d] text-white hover:bg-[#00df9a] focus:bg-[#00df9a]">Geography</option>
                        <option value="History"className="bg-[#52529d] text-white hover:bg-[#00df9a] focus:bg-[#00df9a]">History</option>
                        <option value="Art"className="bg-[#52529d] text-white hover:bg-[#00df9a] focus:bg-[#00df9a]">Art</option>
                        <option value="Animals"className="bg-[#52529d] text-white hover:bg-[#00df9a] focus:bg-[#00df9a]">Animals</option>
                    </select>
                    <label
                        htmlFor="category"
                        className="absolute text-sm duration-300 transform scale-75 -translate-y-6 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Category
                    </label>
                    </div>
        
                    <div className="relative my-4">
                    <select
                        name="difficulty"
                        value={quizData.difficulty}
                        onChange={handleChange}
                        required
                        className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none focus:outline-none focus:ring-0 focus:border-[#00df9a] peer cursor-pointer"
                    >
                        <option value="Any difficulty"className="bg-[#52529d] text-white hover:bg-[#00df9a] focus:bg-[#00df9a]">Any difficulty</option>
                        <option value="Easy"className="bg-[#52529d] text-white hover:bg-[#00df9a] focus:bg-[#00df9a]">Easy</option>
                        <option value="Medium"className="bg-[#52529d] text-white hover:bg-[#00df9a] focus:bg-[#00df9a]">Medium</option>
                        <option value="Hard"className="bg-[#52529d] text-white hover:bg-[#00df9a] focus:bg-[#00df9a]">Hard</option>
                    </select>
                    <label
                        htmlFor="difficulty"
                        className="absolute text-sm duration-300 transform scale-75 -translate-y-6 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Difficulty
                    </label>
                    </div>
        
                    <div className="relative my-4">
                    <input
                        type="datetime-local"
                        name="startDate"
                        value={quizData.startDate}
                        onChange={handleChange}
                        required
                        className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none focus:outline-none focus:ring-0 focus:border-[#00df9a] peer z-10 cursor-pointer"
                        placeholder=""
                    />
                    <label
                        htmlFor="startDate"
                        className="absolute text-sm duration-300 transform scale-75 -translate-y-6 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Start Date
                    </label>
                    </div>
        
                    <div className="relative my-4">
                    <input
                        type="datetime-local"
                        name="endDate"
                        value={quizData.endDate}
                        onChange={handleChange}
                        required
                        className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-[#52529d] appearance-none focus:outline-none focus:ring-0 focus:border-[#00df9a] peer z-10 cursor-pointer"
                        placeholder=""
                    />
                    <label
                        htmlFor="endDate"
                        className="absolute text-sm duration-300 transform scale-75 -translate-y-6 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        End Date
                    </label>
                    </div>
                </div>

                <button
                  type="submit"
                  className="w-full mb-4 text-[18px] rounded bg-[#52529d] py-2 hover:bg-[#00df9a] transition-colors duration-300"
                >
                  {loading ? "Creating..." : "Create Quiz Tournament"}
                </button>
              </form>
            </div>
          </div>
          <Footer />
        </div>
      );
    };
    
export default CreateQuiz;
