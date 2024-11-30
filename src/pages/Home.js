import React from "react";
import { Link } from "react-router-dom";
import "../css/Homepage.css"; // Adjusted path to point to the CSS file inside 'ccsf'

const HomePage = () => {
    return (
        <div className="homepage">
            <header>
                <title>Welcome to QuizQuest-Arena</title>
                <h1>QuizQuest-Arena</h1>
            </header>
            <main>
                <p className="tagline">
                    Unleash your knowledge and challenge yourself with our interactive quizzes!
                </p>
                <nav className="homepage-nav">
                    <Link to="/register" className="btn-primary">
                        Register
                    </Link>
                    <Link to="/login" className="btn-secondary">
                        Login
                    </Link>
                </nav>
            </main>
        </div>
    );
};

export default HomePage;
