const _ = require('lodash');
const Path = require('path-parser');
const {URL} = require('url')
const authenticate = require('../middlewares/requireLogin')
const checkCredits = require('../middlewares/requireCredits')
const { Survey } = require('../models/survey');
const { Mailer } = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')


module.exports = (app) => {
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('THANK YOU FOR VOTING!!!')
    })

    app.post('/api/surveys/webhooks',(req,res)=>{
        const p = new Path('/api/surveys/:surveyId/:choice'); 
        
        _.chain(req.body)
        .map(({url,email})=>{
            const match = p.test(new URL(url).pathname);
            if(match){
                return {email,surveyId:match.surveyId,choice:match.choice}
            }
        })
        .compact()
        .uniqBy( 'email','surveyId')
        .each(({email,choice,surveyId})=>{
            Survey.updateOne({
                _id:surveyId,
                recipients:{
                    $elemMatch:{email:email,responded:false}
                }
            },{
                $inc:{[choice]:1},
                $set:{'recipients.$.responded':true},
                lastResponded:new Date()
            }).exec()
        })
        .value();
    });

    app.post('/api/surveys', authenticate, checkCredits, async(req, res) => {
        let { title, body, subject, recipients } = req.body;
        const survey = new Survey({
            _user: req.user.id,
            title,
            body,
            subject,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            dateSent: Date.now()
        });

        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);

        } catch (error) {
            res.status(422);
        }

    });

    app.get('/api/surveys',authenticate,async(req,res)=>{
        const user = req.user;
        const surveys = await Survey.find({_user:user.id})
            .select({recipients:false});

        res.send(surveys)
    });

}