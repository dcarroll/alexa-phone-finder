"use strict";

//let salesforce = require("./salesforce");
let accountSid = process.env.ACCOUNT_SID; // Your Account SID from www.twilio.com/console
let authToken = process.env.AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
let fromNumber = process.env.FROM_NUMBER;

let twilio = require('twilio');
let client = new twilio.RestClient(accountSid, authToken);

exports.SearchHouses = (slots, session, response) => {
    if (slots.City.value) {
        session.attributes.city = slots.City.value;
        if (slots.Bedrooms.value) {
            session.attributes.bedrooms = slots.Bedrooms.value;
            if (slots.Price.value) {
                session.attributes.price = slots.Price.value;
                doSearch(slots, session, response);
            } else {
                session.attributes.stage = "ask_price";
                response.ask("Ok, around what price?");
            }
        } else {
            session.attributes.stage = "ask_bedrooms";
            response.ask("Ok, how many bedrooms?");
        }
    } else {
        session.attributes.stage = "ask_city";
        response.ask("OK, in what city?");
    }
};

let contacts = {
    "<contact name>": "<contact phone number>",
};

exports.Call = (slots, session, response) => {
    this.Ring(slots, session, response);
};

exports.Ring = (slots, session, response) => {
    if (slots.Phone.value) {
        response.say("Ok, calling requested number.");
        doCallPhone(slots.Phone.value);
    } if (slots.Who.value) {
        console.log("WHO: " + slots.Who.value);
        if (contacts[slots.Who.value]) {
            response.say("Ok, calling " + slots.Who.value + ' phone.');
            doCallPhone(contacts[slots.Who.value]);
        } else {
            response.say("Golly, don't have " + slots.Who.value + " in your list of contacts.");
        }
    } else {
        response.say("Gee whiz, I didn't really understand that, try find 6507430794.");
    }
};

let doCallPhone = (toNumber) => {
    client.makeCall({

    to:"+1" + toNumber, // Any number Twilio can call
    from: fromNumber, // A number you bought from Twilio and can use for outbound communication
    url: 'https://demo.twilio.com/welcome/voice/' // A URL that produces an XML document (TwiML) which contains instructions for the call

}, function(err, responseData) {

    //executed when the call has been initiated.
    if (err) {
        console.log(err);
    }
    if (responseData) {
        console.log(responseData.from); // outputs "+14506667788"
    }

});
}



