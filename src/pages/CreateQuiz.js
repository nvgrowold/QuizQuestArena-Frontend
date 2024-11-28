import React, { useState } from 'react';

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
        try {
            const response = await fetch('/api/quizzes/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token for authentication if needed
                },
                body: JSON.stringify(quizData),
            });

            if (response.ok) {
                const result = await response.json();
                setMessage(result.message || 'Quiz created successfully!');
                setError('');
            } else {
                const errorResult = await response.json();
                setError(errorResult.message || 'Failed to create quiz.');
                setMessage('');
            }
        } catch (error) {
            console.error('Error creating quiz:', error);
            setError('An unexpected error occurred.');
        }
    };

    return (
        <div className="create-quiz">
            <h1>Create Quiz Tournament</h1>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Quiz Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={quizData.name}
                    onChange={handleChange}
                    required
                />
                <br />

                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    name="category"
                    value={quizData.category}
                    onChange={handleChange}
                >
                    <option value="Any Category">Any Category</option>
                    <option value="General Knowledge">General Knowledge</option>
                    <option value="Entertainment: Books">Entertainment: Books</option>
                    <option value="Science & Nature">Science & Nature</option>
                    <option value="Science: Computers">Science: Computers</option>
                    <option value="Science: Mathematics">Science: Mathematics</option>
                    <option value="Sports">Sports</option>
                    <option value="Geography">Geography</option>
                    <option value="History">History</option>
                    <option value="Art">Art</option>
                    <option value="Animals">Animals</option>
                </select>
                <br />

                <label htmlFor="difficulty">Difficulty:</label>
                <select
                    id="difficulty"
                    name="difficulty"
                    value={quizData.difficulty}
                    onChange={handleChange}
                >
                    <option value="Any difficulty">Any difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
                <br />

                <label htmlFor="startDate">Start Date:</label>
                <input
                    type="datetime-local"
                    id="startDate"
                    name="startDate"
                    value={quizData.startDate}
                    onChange={handleChange}
                    required
                />
                <br />

                <label htmlFor="endDate">End Date:</label>
                <input
                    type="datetime-local"
                    id="endDate"
                    name="endDate"
                    value={quizData.endDate}
                    onChange={handleChange}
                    required
                />
                <br />

                <button type="submit">Create Quiz Tournament</button>
            </form>
        </div>
    );
};

export default CreateQuiz;
