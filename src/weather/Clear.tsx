import React from 'react';

export const Clear: React.FC = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 26 26"
            width="26"
            height="26"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Moon shape for clear weather */}
            <circle cx="13" cy="13" r="8" fill="lightgray" stroke="none" />
            <circle cx="10" cy="10" r="6" fill="white" stroke="none" />
        </svg>
    );
};