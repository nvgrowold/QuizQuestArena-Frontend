import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            <Helmet>
                <title>Welcome to QuizQuest-Arena</title>
            </Helmet>
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
