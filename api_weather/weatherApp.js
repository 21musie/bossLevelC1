const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Function to fetch weather data
async function fetchWeatherData(city) {
    const apiKey = process.env.API_KEY; // Use environment variable for API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let data = '';

            response.on("data", chunk => {
                data += chunk;
            });

            response.on("end", () => {
                const weatherData = JSON.parse(data);
                if (weatherData.cod !== 200) {
                    reject(new Error(weatherData.message));
                } else {
                    resolve(weatherData);
                }
            });
        }).on("error", (err) => {
            reject(err);
        });
    });
}

// Handle POST request to get weather data
app.post("/weather", async (req, res) => {
    const city = req.body.cityName;

    try {
        const weatherData = await fetchWeatherData(city);
        const temp = weatherData.main.temp;
        const desc = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;

        res.send(`
            <h1>The temperature in ${city} is <span style="color: blue;">${temp} &deg;C</span></h1>
            <h1>and the weather is: ${desc}</h1>
            <img src='http://openweathermap.org/img/wn/${icon}@2x.png'>
        `);
    } catch (error) {
        res.send(`<h1>Error: ${error.message}</h1>`);
    }
});

// Function to get city name from coordinates
async function getCityName(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    const response = await fetch(url);
    const data = await response.json();

    return data?.address?.city || data?.address?.town || data?.address?.village || null;
}

// Example usage of getCityName
const latitude = 40.7128;
const longitude = -74.0060;

getCityName(latitude, longitude)
    .then(cityName => console.log(`The city name is: ${cityName}`))
    .catch(error => console.error('Error:', error));

// Function to get coordinates from city name
async function getCoordinates(cityName) {
    const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(cityName)}&format=json`;
    const response = await fetch(url);
    const data = await response.json();

    return data.length > 0 ? { latitude: data[0].lat, longitude: data[0].lon } : null;
}

// Example usage of getCoordinates
const cityExample = 'New York';

getCoordinates(cityExample)
    .then(coords => console.log(`Coordinates: ${coords.latitude}, ${coords.longitude}`))
    .catch(error => console.error('Error:', error));

// Start the server
app.listen(2000, () => {
    console.log("Server is running on port 2000...");
});
