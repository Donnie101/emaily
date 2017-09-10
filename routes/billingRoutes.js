const { STRIPE_SECRET_KEY } = require('../config/keys');
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const passport = require('passport');
const authenticate = require('../middlewares/requireLogin')

module.exports = (app) => {
    app.post('/api/stripe', authenticate, async(req, res) => {
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });

        req.user.credits += 5;
        const user = await req.user.save();
        res.send(user)
    });
}