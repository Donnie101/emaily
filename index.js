const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the home page');
});

app.listen(PORT, () => {
    console.log('server is listening')
});