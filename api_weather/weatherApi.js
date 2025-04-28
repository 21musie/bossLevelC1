// Import required modules
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

// Initialize Express app
const app = express();

// Middleware to parse URL-encoded bodies (for form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

// Route to serve the HTML form for city input
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Route to handle form submission and fetch weather data for the city
app.post("/weather", (req, res) => {
    const city = req.body.cityName; // Get city name from form input
    const apiKey = "4c06d116afad1db786ea165c4cbe82af"; // OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Make HTTPS GET request to OpenWeatherMap API
    https.get(url, (response) => {
        console.log(response.statusCode); // Log response status

        // When data is received from the API
        response.on("data", (data) => {
            const weatherData = JSON.parse(data); // Parse JSON response

            // Check if city is not found or error occurs
            if (weatherData.cod !== 200) {
                res.send(`<h1>Error: ${weatherData.message}</h1>`);
                return;
            }

            // Extract useful weather information
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            // Send weather information back to the client
            res.write(`<h1>The temperature in ${city} is <span style="color: blue;"> ${temp} &deg;C </span></h1>`);
            res.write(`<h1>and the weather is: ${desc}</h1>`);
            res.write(`<img src='http://openweathermap.org/img/wn/${icon}@2x.png'>`);
            res.send(); // End the response
        });
    });
});

///////////////////////////// Utility Functions //////////////////////////

// Function to get city name from given latitude and longitude using OpenStreetMap's Nominatim API
async function getCityName(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    const response = await fetch(url);
    const data = await response.json();

    if (data && data.address) {
        // Return the city, town, or village name if available
        return data.address.city || data.address.town || data.address.village || null;
    }
    return null;
}

// Example usage of getCityName function
const latitude = 40.7128;
const longitude = -74.0060;

getCityName(latitude, longitude)
    .then(cityName => console.log(`The city name is: ${cityName}`))
    .catch(error => console.error('Error:', error));

// Function to get coordinates (latitude and longitude) from a city name using Nominatim API
async function getCoordinates(cityName) {
    const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(cityName)}&format=json`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.length > 0) {
        const location = data[0]; // Take the first matching result
        return { latitude: location.lat, longitude: location.lon };
    }
    return null;
}

// Example usage of getCoordinates function
const cityName = 'New York';

getCoordinates(cityName)
    .then(coords => console.log(`Coordinates: ${coords.latitude}, ${coords.longitude}`))
    .catch(error => console.error('Error:', error));

// Start the Express server
app.listen(2000, () => {
    console.log("Server is running on port 2000...");
});
