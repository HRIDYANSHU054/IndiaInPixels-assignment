# IndiaInPixels Assignment Task

## Project Overview

Inspired by Leaflet.js [Interactive Choropleth Map implementation](https://leafletjs.com/examples/choropleth/).This React app renders a dynamic, interactive map of India using React Leaflet. The core functionality revolves around enabling users to interact with Indian states through hover, click-to-zoom, download and print map and temperature overlay features. The app also includes optional district-level detail on state clicks. As an additional layer, real-time temperature data is fetched and displayed for each state, offering a weather-based visualization.

## Features

- **Hover Tooltips**: Display the state name dynamically when hovered.
- **Click-to-Zoom**: Zoom in on a state when clicked, and zoom out when clicked again.
- **Dynamic Temperature Overlay**: Shows the current day's temperature for each Indian state and union territory.
- **Conditional Loading of District Data**: Loads district data when a state is clicked for performance optimization.
- **Interactive Legends**: A color-coded legend representing the current temperature in each state.
- **Download and Print Options**: Users can download or print the current map view using Leaflet-EasyPrint.

## Approach and Key Decisions

- **Map Rendering**: I chose React Leaflet as the core library for rendering the map due to its performance efficiency and flexibility in handling GeoJSON data and custom event handlers.
- **GeoJSON Data Handling**: I structured the project to dynamically load GeoJSON data for both the states and districts. To avoid performance degradation, I implemented conditional loading of district data based on user interaction.
- **Zoom Feature**: The map's zoom functionality was implemented using Leaflet's setView() method. When a state is clicked, the map zooms into the specific state, and clicking the same state again zooms out to the default view of India.
- **Temperature Data Integration**: Real-time temperature data for each state was integrated using a public weather API. By leveraging Promise.all(), API requests for all states were made concurrently to speed up data fetching.
- **Legends and UI Enhancements**: I designed a temperature-based legend to visually represent the temperature ranges in each state. The legend dynamically updates as temperatures change.
- **Download and Print Options**: To allow users to download or print the current map view, I used the Leaflet-EasyPrint library. It allows users to quickly and easily download or print the map. While React-Leaflet-EasyPrint exists, it was incompatible with React Leaflet versions 3 and higher, so I opted for a custom integration of Leaflet-EasyPrint, which at the moment of writing this is fully compatible.

## Challenges and Solutions

- **Rendering State Boundaries and Maintaining Performance**: Loading and rendering large GeoJSON data for Indian states and districts while maintaining smooth interaction was critical. I ensured that state-level data is loaded initially, while district data is fetched only upon clicking a state.
- **Ensuring Smooth Hover Events**: Hover events were optimized to avoid flickering or performance issues by leveraging React Leaflet’s Tooltip component and event listeners.
- **Maintaining Map State During Data Updates**: To ensure the map didn’t reset its zoom or center when district data was rendered, I managed the zoom and center state persistently across updates.

## Styling and Design

- The app uses Simple CSS no modules no tw no nothing and Leaflet's CSS for basic map styling for custom UI elements.

## Future Enhancements

- **Weather Forecasts**: Expanding the app to display future weather forecasts alongside current temperatures.
- **Additional Map Layers**: Implementing additional data layers, such as air quality or population density could be a big update.
- **Optimized Mobile Version**: Ensuring the app performs well across all screen sizes, including mobile devices.

## How to Run the Project

1. **Install dependencies**: Run `npm install` in the project directory.
2. **Run the app**: Run `npm run dev` to launch the development server.
3. **Add API Key**: To fetch temperature data for the states, you need to add a weather API key. Here's how to do it:
   - Create a new file named `.env` in the root directory of your project.
   - Inside the `.env` file, create a new environment variable `VITE_WEATHER_API` and assign your API key to it, like this: `VITE_WEATHER_API=your_api_key`.
   - You can obtain a free weather API key from [MeteoSource](https://www.meteosource.com/). Sign up for an account, create a new API key, and replace `your_api_key` with your actual API key.

This app provides a comprehensive interactive map experience with real-time data and could be extended for other data visualizations.

**Special thanks to [udit-001](https://github.com/udit-001) for [GeoJSON data on India](https://github.com/udit-001/india-maps-data)**
