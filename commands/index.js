'use strict';

var hotload        = require('hotload');
var helper         = hotload('../helper');
var user           = hotload('../modules/user').actions;
var featureRequest = hotload('../modules/featureRequest').actions;
var bugReport      = hotload('../modules/bugReport').actions;
var google         = hotload('../modules/google').actions;
var wikipedia      = hotload('../modules/wikipedia').actions;

//var wolf           = hotload('../modules/wolframAlpha').actions;
var urban          = hotload('../modules/urban').actions;
var help           = hotload('../modules/help').actions;
var danger         = hotload('./dangerzone');
var roulette       = hotload('./roulette');
var colour         = hotload('../colour');
var response       = hotload('../responses').actions;
var config = require('../setup/config');

(function (commands) {
  commands.hello = function () {
    return 'I don\'t like your face';
  };

  commands.complain = function () {
    return 'The opponent builds throwing dagger. "Oh my god dude, are you kidding me?" says Hayzer. The opponent hits an auto attack. "Seriously dude? How does he do that?" The opponent backs to base. "I can\'t handle this dude, I can\'t beat that." The opponent rotates. "This is some crazy draft RNG bullshit" says Hayzer.';
  };

  commands.donate = function () {
    return 'Donate here https://www.twitchalerts.com/donate/hayzer4 FeelsGoodMan';
  };

  commands.kys = function () {
    return 'no';
  };

  commands.roast = function () {
    return 'stop streaming you so ugly .man your mother god dam :( you need friends';
  };

  commands.fdot = function () {
    return 'Ｆ． ＳＨＡＧＧＥＤ ＭＹ ＤＡＤ';
  };

  commands.eccies = function () {
    return 'What does eccies even mean?';
  };

  commands.cunt = function () {
    return 'Ｃ Ｕ Ｎ Ｔ';
  };

  commands.godrequest = function () {
    return 'Go fuck yourself';
  };

  commands.c = function (bot, from, to, text, split) {
    return eval(split.splice(1).join(''));
  };

  commands.test = function () {
    return 'this is a test';
  };

  commands.join = function (bot, from, to, text, split) {
    bot.join(split[1]);
  };

  commands.part = function (bot, from, to, text, split) {
    if (config.admin.indexOf(from) > -1) {
      bot.part(split[1], '...');
    }
  };

  commands.wide = function (bot, from, to, text, split) {
    var response;
    var mong = text.split('');
    for (var i = 6; i < text.length; i++) {
      if (mong[i] === ' ') {
        response += ' ';
      } else {
        response += String.fromCharCode(0xFEE0 + text.charCodeAt(i));
      }
    }

    return response;
  };

  // commands.cotw = function (bot, from, to, text, split) {
  //   var joint = split.length > 1 ? split.splice(1).join(' ') : 'Rainbow';
  //   var response = '';
  //   var colArr = [colour.red, colour.orange, colour.yellow, colour.green,
  //     colour.blue, colour.purple, colour.violet];
  //   for (var i = 0; i < joint.length; i++) {
  //     response += colArr[i % 7] + joint[i];
  //   }
  //
  //   return response;
  // };

  commands.hayzer = function () {
    return 'Ｈ Ａ Ｙ Ｚ Ｅ Ｒ';
  };

  commands.list = function (bot, from) {
    bot.emit('response', Object.keys(commands).join(', '), from);
    return (Object.keys(commands).join(', '), '@' + from);
  };

	/* Module Commands */
  commands.g           = google.query;
  commands.gd          = google.queryDesc;
  commands.wik         = wikipedia.query;
//	commands.wa          = wolf.query;
  commands.ud          = urban.query;
  commands.ub          = urban.battle;
  commands.urban_reset = urban.reset;

	/* Core Commands *
//	commands.karma       = user.karmaQuery;
//	commands.reasons     = user.reasons;
//	commands.leaderboard = user.leaderboard;
//	commands.loserboard  = user.loserboard;
//	commands.ben         = user.ben;
//	commands.mal         = user.mal;
//	commands.store       = user.store;
//	commands.heed        = user.heed;
//	commands.notHeed     = user.notHeed;
//	commands.T           = user.T;
//	commands.Ty          = user.Ty;
//	commands.noT         = user.noT;
//	commands.wfh         = user.wfh;
//	commands.notWfh      = user.notWfh;
//	commands.set         = response.store;
//	commands.addKey      = response.addKey;
//	commands.addResponse = response.addResponse;
//	commands.help        = help.get;
//	commands.addHelp     = help.store;

	/* Stand Alones */
commands.dangerzone   = danger.zone;
commands.roulette     = roulette.trigger;
commands.rouletteSpin = roulette.spin;

	/* Maintenance Commands */
//	commands.featureRequest  = featureRequest.store;
//	commands.featureRequests = featureRequest.url;
//	commands.bugReport       = bugReport.store;

})(module.exports);
