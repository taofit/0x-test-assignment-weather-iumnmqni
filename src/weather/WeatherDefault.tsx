import React from 'react';

export const DefaultWeather = () => (
    <svg
        width="26"
        height="27"
        viewBox="0 0 26 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="13" cy="13.5" r="6" fill="gray" />
        <line
            x1="13"
            y1="0"
            x2="13"
            y2="27"
            stroke="gray"
            strokeWidth="2"
        />
        <line
            x1="0"
            y1="13.5"
            x2="26"
            y2="13.5"
            stroke="gray"
            strokeWidth="2"
        />
    </svg>
);