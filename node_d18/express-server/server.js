const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('<h1>Hello mars!</h1>')
});
app.get('/contact', (req, res) => {
    res.send('<h1>Contact marsssss!</h1>')
});
app.listen(port, () => {
    console.log(`app started on port:  ${port}`)
});