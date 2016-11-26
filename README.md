# Finder Bot for Alexa

Ask Alexa to find your phone.  Can do just phone numbers or you can create a contact list.

### Step 1: Deploy the DreamHouse Alexa Skill

1. Make sure you are logged in to the [Heroku Dashboard](https://dashboard.heroku.com/)
1. Click the button below to deploy the Alexa Skill on Heroku:

    [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

1. Fill in the config variables as described.

### Step 2: Create an Amazon AWS account

If you don't already have an AWS account, follow the steps below to create one:

1. Open a browser and access the AWS Console: http://aws.amazon.com/
 
1. Click **Create an AWS Account** 

### Step 3: Configure the Skills

1. Login to the Alexa console: https://developer.amazon.com/edw/home.html

1. Click **Get Started** in the **Alexa Skills Kit** tile

1. Click the **Add New Skill** button

1. Fill in the **Skill Information** screen as follows:

    - Skill Type: **Custom Interaction Model**
    - Name: **Finder**
    - Invocation Name: **finder**
    
1. On the **Interaction Model** Screen:    
    - Paste the following JSON document in the **Intent Schema** box:

        ```
{
  "intents": [
    {
      "intent": "Call",
      "slots": [
        {
          "name": "Phone",
          "type": "AMAZON.NUMBER"
        },
        { "name": "Who",
          "type": "AMAZON.US_FIRST_NAME"
        }
      ]
    },
    {
      "intent": "Ring",
      "slots": [
        {
          "name": "Phone",
          "type": "AMAZON.NUMBER"
        },
        { "name": "Who",
          "type": "AMAZON.US_FIRST_NAME"
        }

      ]
    },
    {
      "intent": "AMAZON.HelpIntent"
    }
  ]
}
        ```
    - Paste the following text in the **Sample Utterances** box:
     
        ```
Call to call my phone
Call to call {Phone}
Call to find {Who} phone
Ring to ring {Phone}
Ring to ring {Who} phone
        ```
     
1. On the **Configuration** screen, select **HTTPS**, and enter the URL of the Heroku app you deployed in Step 3, followed by the /finder path. For example:
     
     ```
     https://myalexabot.herokuapp.com/finder
     ```

1. On the **SSL certificate** screen, select **My development endpoint is a subdomain of a domain that has a wildcard certificate from a certificate authority**
  
1. You are now ready to test the Finders skill.  
     