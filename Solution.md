# Solution

## Project Description

This weather app fetches weather data from the [AccuWeather API](https://developer.accuweather.com/) and displays weather forecast information on a webpage. It is developed using **TypeScript** and the **ReactJS** framework.

## Main Features

- Display an overview of the current location's weather information.
- Show hourly weather forecasts for the current location.
- Provide a 5-day weather forecast for the current location.

## How to Run the Project

1. Create a `.env` file in the root directory.
2. Add your API key to the `.env` file:
   ```env
   REACT_APP_ACCUWEATHER_API_KEY={your_api_key}
3. run the following command to start the project:
 `npm start` 

## Code Walkthrough
### Folder Structure
- components: Contains reusable components for displaying current, hourly, and daily weather information.
- types: Stores all type definitions used throughout the project.
- utils: Includes utility functions such as:
    - Generating hours of the day.
    - Generating weekdays.
    - Converting Fahrenheit to Celsius.
    - Determining background descriptions based on the current time.
- weather: Contains weather-related assets, such as SVG images for different weather types, and functions to fetch weather data from the API.
### Core Logic
- `index.tsx`: The program's entry point, which renders the `App.tsx` component.
- `App.tsx`: The core logic of the weather app:
    - On page load, it retrieves the user's current geolocation (`locationKey`) using the AccuWeather API.
    - Fetches daily, hourly, and general weather data for the current location.
    - Saves all fetched weather data (e.g., hourly and daily forecasts) in `localStorage` for offline access.
    - Displays the weather information dynamically on the webpage.
    - Add user-friendly error message in the page when fail to fetch data from APIs