import React from 'react';

export const Loading: React.FC = () => {
    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading Weather Data...</p>
        </div>
    );
};