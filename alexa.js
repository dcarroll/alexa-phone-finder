"use strict";

module.exports = (req, res) => {

    let session = req.body.session,
        intent,
        slots;
    session.attributes = session.attributes || {};

    if (req.body.request.intent) {
        intent = req.body.request.intent.name;
        slots = req.body.request.intent.slots;
    }

    let say = (text, shouldEndSession, card) => {

        let outputSpeech = {};

        if (text.indexOf("/>") > 0 || text.indexOf("</")) {
            outputSpeech.type = 'SSML';
            outputSpeech.ssml = "<speak>" + text + "</speak>";
        } else {
            outputSpeech.type = 'PlainText';
            outputSpeech.text = text;
        }

        let resp = {
            version: req.version,
            sessionAttributes: session.attributes,
            response: {
                outputSpeech: outputSpeech,
                shouldEndSession: shouldEndSession,
            }
        };
        
        if (typeof card != "undefined") {
            resp.response.card = card;
        }

        console.log("RESPONSE:\n" + JSON.stringify(resp) + "\n");
        res.json(resp);

    };

    return {

        type: req.body.request.type,

        intent: intent,

        slots: slots,

        session: session,

        response: {
            say: (text, card) => say(text, true, card),
            ask: text => say(text, false)
        }

    };

};