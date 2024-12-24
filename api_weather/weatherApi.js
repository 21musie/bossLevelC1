const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { log } = require("console");
const { CLIENT_RENEG_WINDOW } = require("tls");

const app = express();

app.get("/", (req, res) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=38.8&lon=8.9&appid=4c06d116afad1db786ea165c4cbe82af&units=metric";
    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            console.log(desc);
            res.send('<h1>The temprature in your areea is ' + temp + ' celcius</h1>');
        });
    });


    res.send("up and runnig");

})

app.listen(2000, () => {
    console.log("rollinggggggg ...");
});