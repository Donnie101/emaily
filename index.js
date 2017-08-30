require('./services/passport')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const { MONGO_URI, SECRET } = require('./config/keys')

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useMongoClient: true });

let PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cookieSession({
    keys: [SECRET],
    maxAge: 30 * 24 * 60 * 60 * 1000
}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authroutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


app.listen(PORT, () => {
    console.log('server is listening')
});