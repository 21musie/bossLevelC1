// const express = require("express");
// const https = require("https");
// const bodyParser = require("body-parser");
// const { log } = require("console");
// const { CLIENT_RENEG_WINDOW } = require("tls");

// const app = express();

// app.get("/", (req, res) => {
//     const url = "https://api.openweathermap.org/data/2.5/weather?lat=38.8&lon=8.9&appid=4c06d116afad1db786ea165c4cbe82af&units=metric";
//     https.get(url, (response) => {
//         console.log(response.statusCode);
//         response.on("data", (data) => {
//             const weatherData = JSON.parse(data);
//             const temp = weatherData.main.temp;
//             const desc = weatherData.weather[0].description;
//             const icon = weatherData.weather[0].icon;

//             console.log(icon);

//             res.write('<h1>The temprature in your area is ' + temp + ' celcius</br></h1>');
//             res.write(' <h1> and the weather is : ' + desc + '</h1>');
//             res.write("<img src='http://openweathermap.org/img/wn/" + icon + "@2x.png'>");
//             res.send();
//         });
//     });

//     //apparently we cant have more than one res.send statements --error code:'ERR_HTTP_HEADERS_SENT'
//     //but we can have multiple res,write statements and then finally call res.send
//     // res.send("up and runnig");

// })

// app.listen(2000, () => {
//     console.log("rollinggggggg ...");
// });

//with city input

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Set up the root route to accept form input
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Handle POST request to get weather data
app.post("/weather", (req, res) => {
    const city = req.body.cityName;
    const apiKey = "4c06d116afad1db786ea165c4cbe82af";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            if (weatherData.cod !== 200) {
                // Handle error case where city is not found
                res.send(`<h1>Error: ${weatherData.message}</h1>`);
                return;
            }
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            res.write(`<h1>The temperature in ${city} is <span style="color: blue;"> ${temp} &deg;C </span></h1>`);
            res.write(`<h1>and the weather is: ${desc}</h1>`);
            res.write(`<img src='http://openweathermap.org/img/wn/${icon}@2x.png'>`);
            res.send();
        });
    });
});


/////////////////////////////make it easier////////////////////////
async function getCityName(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.address) {
        return data.address.city || data.address.town || data.address.village || null;
    }
    return null;
}

// Example usage
const latitude = 40.7128;
const longitude = -74.0060;

getCityName(latitude, longitude)
    .then(cityName => console.log(`The city name is: ${cityName}`))
    .catch(error => console.error('Error:', error));

/////////////////////////////city to coordinates////////////////////////
async function getCoordinates(cityName) {
    const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(cityName)}&format=json`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.length > 0) {
        const location = data[0];
        return { latitude: location.lat, longitude: location.lon };
    }
    return null;
}

// Example usage
const cityName = 'New York';

getCoordinates(cityName)
    .then(coords => console.log(`Coordinates: ${coords.latitude}, ${coords.longitude}`))
    .catch(error => console.error('Error:', error));


// Start the server
app.listen(2002, () => {
    console.log("Server is running on port 2000...");
});