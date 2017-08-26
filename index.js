const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the home page');
});

app.listen(port, () => {
    console.log('server is listening')
});

//https://hidden-island-16834.herokuapp.com/