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
var roulette       = hotload('./roulette');
var eightball      = hotload('./8ball');
var randomemote    = hotload('./randomemote');
var colour         = hotload('../colour');
var response       = hotload('../responses').actions;
var config = require('../setup/config');

(function (commands) {
  commands.hello = function () {
    return 'I don\'t like your face';
  };

  commands.c = function (bot, from, to, text, split) {
    return eval(split.splice(1).join(''));
  };

  commands.test = function () {
    var text = ['1', '-1', 'icles', colour.dance + ' tests'];
    return helper.choose(text);
  };

  commands.join = function (bot, from, to, text, split) {
    bot.join(split[1]);
  };

  commands.part = function (bot, from, to, text, split) {
    if (config.admin.indexOf(from) > -1) {
      bot.part(split[1], '...');
    }
  };

  // commands.gift = function (bot, from, to, text, split) {
  //   var args = split.splice(1);
  //   if (args.length != 2) {
  //     return 'Format for gift command is !gift <name> <amount>'
  //   } else if ()
  // };

  commands.wide = function (bot, from, to, text, split) {
    var array = split.splice(1);

    var response = '';
    for (var i = 0; i < array.length; i++) {
      if (!(/^[A-Za-z\d\s]+$/.test(array[i]))) {
        return 'Can only widen alphanumeric characters, no special chars pls';
      };

      for (var j = 0; j < array[i].length; j++) {
        response += String.fromCharCode(0xFEE0 + array[i].charCodeAt(j));
      }

      response += ' ';
    }

    return response;
  };

  commands.playlist = function () {
    return 'here is my shitty youtube playlist, it\'s bad https://www.youtube.com/watch?v=8EzfBYFU8Q0&list=PLgi4Oy1KF4CNdVYAFKUOe0mAriE8_jWgS';
  };

  commands.twitter = function () {
    return 'Yo check out dese hot tweets https://www.twitter.com/SmiteHayzer';
  };

  commands.smite = function () {
    return 'You can get Smite at https://www.smitegame.com';
  };

  commands.hayzer = function () {
    return 'Ｈ Ａ Ｙ Ｚ Ｅ Ｒ';
  };

  commands.suicide = function (bot, from, to, text, split) {
    return ('.timeout ' + from + ' 60');
  };

  commands.list = function (bot, from, to, text, split) {

    return ('@' + from + ': The commands for this bot are: ' + Object.keys(commands).join(', '));
  };

  /* Module Commands */
  commands.g           = google.query;
  commands.gd          = google.queryDesc;
  commands.wik         = wikipedia.query;

  //	commands.wa          = wolf.query;
  commands.ud          = urban.query;
  commands.ub          = urban.battle;
  commands.urban_reset = urban.reset;

  /* Core Commands */

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

  //	commands.dangerzone   = danger.zone;
  commands.roulette     = roulette.trigger;

  //	commands.rouletteSpin = roulette.spin;
  commands.eightball    = eightball.trigger;
  commands.randomemote  = randomemote.trigger;

  /* Maintenance Commands */

  //	commands.featureRequest  = featureRequest.store;
  //	commands.featureRequests = featureRequest.url;
  //	commands.bugReport       = bugReport.store;

})(module.exports);
