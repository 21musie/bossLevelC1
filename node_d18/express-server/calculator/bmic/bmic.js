const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/bmiCalc", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/bmiCalc", (req, res) => {
    let num1 = Number(req.body.num1);
    let num2 = Number(req.body.num2);

    let result = num1 + num2;
    if (result < 18.5) {
        res.send("we've got ur result :" + result + "\n" + "gechu skinny ass outa here🤏")
    } else if (result >= 18.5 && result < 24.9) {
        res.send("we've got ur result :" + result + '\n' + " u good homie💪🏽")
    } else if (result >= 25 && result < 29.9) {
        res.send("we've got ur result :" + result + "\n go to the gmy damn it🏋🏽‍♂️")
    } else {
        res.send("we've got ur result :" + result + "\n damnnnnnn, u fat af🙆🏽‍♂️")
    }
});

app.listen(2000, () => {
    console.log("rollin' 📽...");
})