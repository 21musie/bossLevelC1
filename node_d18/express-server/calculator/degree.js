const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to convert Celsius to Fahrenheit
app.post('/convert/celsius-to-fahrenheit', (req, res) => {
    const { celsius } = req.body;
    if (typeof celsius !== 'number') {
        return res.status(400).json({ error: 'Celsius value must be a number' });
    }
    const fahrenheit = (celsius * 9 / 5) + 32;
    res.json({ celsius, fahrenheit });
});

// Route to convert Fahrenheit to Celsius
app.post('/convert/fahrenheit-to-celsius', (req, res) => {
    const { fahrenheit } = req.body;
    if (typeof fahrenheit !== 'number') {
        return res.status(400).json({ error: 'Fahrenheit value must be a number' });
    }
    const celsius = (fahrenheit - 32) * 5 / 9;
    res.json({ fahrenheit, celsius });
});

// Start the server
app.listen(port, () => {
    console.log(`Temperature converter app listening at http://localhost:${port}`);
});