'use strict';
var config         = require('./setup/config.json');
var irc            = require('irc');
var hotload        = require('hotload');
var commands       = hotload('./commands');
var responses      = hotload('./responses');
var helper         = hotload('./helper');
var mongoCon       = require('./setup/mongoConnection').connect(config.db, config.dbName);
var Q              = require('q');
var express        = require('express');
var app            = express();
var setup          = require('./setup/express')(app, config.secret);
var server         = require('http').createServer(app);
var routes         = require('./routes')(app);
var twitterStreams = require('./modules/twitterStreams/');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
server.listen(config.httpPort);

var bot = new irc.Client(config.server, config.name, config);

var userList = {};
var previousMessage = [''];
var previousCommand = [''];
var count = 1;

console.log();

bot.on('join', function (channel, who) {
  bot.say(channel, 'HeyGuys');
});

bot.on('message', function (from, to, text, message) {
  console.log(message);
  var sendTo = from;
  if (to.indexOf('#') > -1) {
    sendTo = to;
  };

  var split = text.split(' ');
  var resp = null;
  if (split[0].charAt(0) === '!') {
    var command = split[0].split('!')[1];
    try {
      resp = commands[command](bot, from, to, text, split, sendTo, userList);
      previousCommand = [command];
    } catch (err) {
      resp = responses.parse(bot, from, split, sendTo);
    }
  } else {
    resp = responses.parse(bot, from, split, sendTo);
  }

  if (resp) {
    bot.say(sendTo, resp);
  }
});

bot.on('response', function (resp, sendTo) {
  if (typeof resp === 'string') {
    resp = [resp];
  }

  if (previousMessage[0] !== resp[0]
    || previousCommand[0] === 'ud'
    || previousCommand[0] === 'list') {
    previousCommand[0] = '';
    previousMessage[0] = resp[0];
    resp.forEach(function (string) {
      bot.say(sendTo, string);
    });
  };
});

bot.on('names', function (channel, nicks) {
    userList[channel] = nicks;
    console.log(userList);
    twitterStreams.query(bot);
  });

bot.on('error', function (message) {
    console.log('error: ', message);
  });

// function loadJSON(file, callback) {
//   var xobj = new XMLHttpRequest();
//   // xobj.overrideMimeType('application/json');
//   xobj.open('GET', file, true);
//   xobj.onreadystatechange = function () {
//       if (xobj.readyState == 4 && xobj.status == "200") {
//         callback(xobj.responseText);
//       }
//     };
//
//   xobj.send(null);
// }
//
// function load() {
//   loadJSON('global_emotes.json', function (response) {
//     var actualJSON = JSON.parse(response);
//     console.log(actualJSON);
//     return actualJSON;
//   });
//
//}
