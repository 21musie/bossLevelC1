const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", (req, res) => {
    res.send("up and runnig");
})

app.listen(2000, () => {
    console.log("rollinggggggg ...");
});