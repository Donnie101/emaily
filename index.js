require('./services/passport')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const { MONGO_URI, SECRET } = require('./config/keys')

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useMongoClient: true });

let PORT = process.env.PORT || 3000;

app.use(cookieSession({
    keys: [SECRET],
    maxAge: 30 * 24 * 60 * 60 * 1000
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authroutes')(app);

app.listen(PORT, () => {
    console.log('server is listening')
});