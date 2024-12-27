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
            const icon = weatherData.weather[0].icon;

            console.log(icon);

            res.write('<h1>The temprature in your area is ' + temp + ' celcius</br></h1>');
            res.write(' <h1> and the weather is : ' + desc + '</h1>');
            res.write("<img src='http://openweathermap.org/img/wn/" + icon + "@2x.png'>");
            res.send();
        });
    });

    //apparently we cant have more than one res.send statements --error code:'ERR_HTTP_HEADERS_SENT'
    //but we can have multiple res,write statements and then finally call res.send
    // res.send("up and runnig");

})

app.listen(2000, () => {
    console.log("rollinggggggg ...");
});