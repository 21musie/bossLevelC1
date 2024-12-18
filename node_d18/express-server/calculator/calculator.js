const express = require("express");
const app = express();


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", (req, res) => {
    res.send("we've got ur message")
});

app.listen(3000, () => {
    console.log("app started on port 3000...");
});

//titbd
app.post("/", (req, res) => {
    res.send("we've got ur message")
});

app.listen(3000, () => {
    console.log("app started on port 3000...");
});