var smiteSession = require('smite-session');
var config = require('./config');
var md5 = require('md5');
var _assign = require('lodash.assign');
var moment = require('moment');
var http = require('http');

(function (actions) {
  smiteSession.set({
      devId: config.devId,
      authKey: config.authKey
    });
  var session = '';

  smiteSession.genSession()
      .then(function (data) {
      console.log(data);
      session = data;
    }).catch(function (error) {
      console.error(error);
    });

  actions.testSession = function (bot, from, to, text, split, sendTo) {
    var utcTime = new moment().utc().format("YYYYMMDDHHmmss");
    console.log('into testsession');
    var authHash = md5(config.devId + 'testsession' + config.authKey + utcTime);
    console.log('hash created');
    var baseUrl = 'http://api.smitegame.com/smiteapi.svc/testsessionjson/';
    var sessionUrl = baseUrl + config.devId + '/' + authHash + '/' + session.session_id + '/' + utcTime;
    console.log('session url created');
    var response = '';
    console.log('past session creation');
    var options = {
      host: 'api.smitegame.com',
      path: '/smiteapi.svc/testsessionjson/' + config.devId + '/' + authHash + '/' + session.session_id + '/' + utcTime,
    };

    http.get(options, function (res) {
      console.log('Got response: ' + res.statusCode);
      if (res.statusCode !== 200) {
        bot.emit('response', 'http://' + options.host + options.path + ' is unreachable.', sendTo);
        return false;
      }

      res.on('data', function (chunk) {
        response += chunk;
        console.log('BODY: ' + chunk);
      });

      res.on('end', function () {
        response = JSON.parse(response);
        console.log(response);
        return true;
      });
    }).on('error', function (e) {
        console.log('Got error: ' + e.message);
        return false;
      });

    return false;
  };

  getPlayer = function (bot, from, to, text, split, sendTo) {
    if (!actions.testSession) {
      genSession();
    }

    var utcTime = new moment().utc().format('YYYYMMDDHHmmss');
    var authHash = md5(config.devId + 'getplayer' + config.authKey + utcTime);
    var baseUrl = 'http://api.smitegame.com/smiteapi.svc/getplayerjson/';
    var sessionUrl = baseUrl + config.devId + '/' + authHash + '/' + session.session_id + '/' + utcTime;
    var response = '';
    var options = {
      host: 'api.smitegame.com',
      path: '/smiteapi.svc/getplayerjson/' + config.devId + '/' + authHash + '/' + session.session_id + '/' + utcTime + '/' + split[1],
    };

    http.get(options, function (res) {
      console.log('Got response: ' + res.statusCode);
      if (res.statusCode !== 200) {
        bot.emit('response', 'http://' + options.host + options.path + ' is unreachable.', sendTo);
      }

      res.on('data', function (chunk) {
        response += chunk;
        console.log('BODY: ' + chunk);
      });

      res.on('end', function () {
        var player = JSON.parse(response);
        console.log(player[0]);
        return player;
      });
    }).on('error', function (e) {
        console.log('Got error: ' + e.message);
      });
      
    return player;
  };

  actions.getRankedConqStats = function (bot, from, to, text, split, sendTo) {
    var player = getPlayer(bot, from, to, text, split, sendTo);
    console.log(player);
    return 'Name: ' + player[0].Name;
    // + '. Tier: ' + player.RankedConquest.Tier
    // + '. Wins: ' + player.RankedConquest.Wins
    // + '. Losses: ' + player.RankedConquest.Losses
    // + '. Rank: ' + player.Ranked_Stat_Conquest;
  };

})(module.exports);
