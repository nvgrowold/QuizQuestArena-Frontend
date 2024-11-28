import React from 'react';
import { useLocation } from 'react-router-dom';

const ErrorPage = () => {
    // Extract error details from the location state or default to a generic message
    const location = useLocation();
    const { state } = location;
    const errorData = state || {
        message: 'Something went wrong!',
        status: 'UNKNOWN',
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Error {errorData.status}</h1>
            <p>{errorData.message}</p>
            <a href="/" style={{ textDecoration: 'none', color: 'blue' }}>
                Go to Home
            </a>
        </div>
    );
};

export default ErrorPage;
