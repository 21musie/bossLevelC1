const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { log } = require("console");
const { CLIENT_RENEG_WINDOW } = require("tls");

const app = express();

});

//apparently we cant have more than one res.send statements --error code:'ERR_HTTP_HEADERS_SENT'
//but we can have multiple res,write statements and then finally call res.send
// res.send("up and runnig");

})

app.listen(2000, () => {
    console.log("rollinggggggg ...");
});