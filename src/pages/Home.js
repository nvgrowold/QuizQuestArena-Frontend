import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            <title>Welcome to QuizQuest-Arena</title>
       
            <h1>Welcome to QuizQuest-Arena Application</h1>
            <nav>
                <Link to="/register">Navigate to Registration</Link>
                <br />
                <Link to="/login">Navigate to Login</Link>
            </nav>     
        </div>
    );
};

export default HomePage;
