###Todo:

##Commands

List of current commands and their usage

#No parameters required:

!hello

!hayzer

!test

!playlist

!twitter

!smite

!eightball \<question text here\> - Get advice from the magic 8ball

!roulette - Spin the wheel and see if you get banned



#Parameters required:

!c \<stuff to evaluate\> - Does calculator things, give it a try

!wide \<text to be changed to full width\>

!g \<text to search on google\>

!ud \<text to be searched on UD\>

!ub \<start word\> \<goal word\> - Use words from the definition of the first word lead to the goal word

!urban_reset - End the current urban battle and reset the start and goal words

##FeatureRequest

##BugReport

##Responses

##Wiki

Message limit responses

Case insensitivity or retry with caps on first

##Karma

##Wiktionary

##Twitter

##Calendar

##Calc

##Wolfram Alpha

##ety

##ud


# Dot
IRC Bot in Node with MongoDB, changed to work specifically on Twitch.

To run the bot you will need Node.js, MongoDB and all the dependencies for the bot which can be installed through NPM.

#Example config
Config lives in setup/config.json.
config.json is in the .gitignore file for this project.

{

  "name": "Dot",

	"server": "irc.foonetic.net",

	"port": "1234"

	"httpPort": "2345"

	"password": "pa55", //oauth key will go here in the case of twitch logins

	"channels": ["#dottest"],

	"admin": ["Lightbot"],

	"debug": true

	// twitter stuff not really used currently
	"twitter_consumer_key": "xxxxxxxxxxxxxxxxxxxxxxxxx",

	"twitter_consumer_secret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",

	"twitter_access_token_key": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",

	"twitter_access_token_secret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

 }
