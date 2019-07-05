const accountSid = 'Your Twilio API Key';
const authToken = 'Your Twilio Token';

const client = require('twilio')(accountSid, authToken);
const fetch = require("node-fetch");

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=Auckland,nz&appid=9527f920611f15ef3a5e7ed52ff7d71c';

module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();
    var msg = "";
    var obj;

    fetch(apiLink)
    .then(res => res.json())
    .then(json => obj = json)
    .then(() => {
        if (obj.rain["1h"] > 0){
            msg = 'Looks like it is raining, bring an umbrella.'
        } else {
            msg = 'No need to bring an umbrella.'
        }
        client.messages.create({
            to: '+Your Number',
            from: '+Your Twilio Number',
            body: msg
        })
    });

    if(myTimer.isPastDue)
    {
        context.log('JavaScript is running late!');
    }

};