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
    var authHash = md5(config.devId + 'testsession' + config.authKey + utcTime);
    var baseUrl = 'http://api.smitegame.com/smiteapi.svc/testsessionjson/';
    var sessionUrl = baseUrl + config.devId + '/' + authHash + '/' + session.session_id + '/' + utcTime;
    var response = '';
    var options = {
      host: 'api.smitegame.com',
      path: '/smiteapi.svc/testsessionjson/' + config.devId + '/' + authHash + '/' + session.session_id + '/' + utcTime,
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
        response = JSON.parse(response);
        console.log(response);
        if (!(response.includes('This was a successful test')))
        {
          smiteSession.genSession()
              .then(function (data) {
              console.log(data);
              session = data;
            }).catch(function (error) {
              console.error(error);
            });
        }
      });
    }).on('error', function (e) {
        console.log('Got error: ' + e.message);
      });
  };

  actions.getRankedConqStats = function (bot, from, to, text, split, sendTo) {
    var player = null;
    validateAPIToken();

    var utcTime = new moment().utc().format('YYYYMMDDHHmmss');
    var authHash = md5(config.devId + 'getplayer' + config.authKey + utcTime);
    var options = {
      host: 'api.smitegame.com',
      path: '/smiteapi.svc/getplayerjson/' + config.devId + '/' + authHash + '/' + session.session_id + '/' + utcTime + '/' + split[1],
    };
    var response = '';
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
        response = JSON.parse(response);
        console.log(response);
        if (response[0] === undefined)
        {
          bot.emit('response', 'Player has profile hidden', sendTo);
        } else {
          tier = actions.calculateLeague(response[0].RankedConquest.Tier);
          bot.emit('response',
          'Name: ' + response[0].Name
          + '. Tier: ' + tier
          + '. Current TP: ' + response[0].RankedConquest.Points
          + '. Wins: ' + response[0].RankedConquest.Wins
          + '. Losses: ' + response[0].RankedConquest.Losses
          + '. Win%: ' + Math.round(response[0].RankedConquest.Wins / (response[0].RankedConquest.Losses + response[0].RankedConquest.Wins) * 100),
          sendTo);
        }
      });
    }).on('error', function (e) {
        console.log('Got error: ' + e.message);
      });

  };

  actions.calculateLeague = function (tier) {
    if (tier / 25 > 1) {
      return 'Masters';
    } else if (tier / 20 > 1) {
      return 'Diamond ' + (6 - (tier % 20));
    } else if (tier / 15 > 1) {
      return 'Platinum ' + (6 - (tier % 15));
    } else if (tier / 10 > 1) {
      return 'Gold ' + (6 - (tier % 10));
    } else if (tier / 5 > 1) {
      return 'Silver ' + (6 - (tier % 5));
    } else if (tier > 0) {
      return 'Bronze ' + (6 - tier);
    } else {
      return 'No league placement';
    }
  };

  actions.getGeneralStats = function (bot, from, to, text, split, sendTo) {
    var player = null;
    validateAPIToken();
    var utcTime = new moment().utc().format('YYYYMMDDHHmmss');
    var authHash = md5(config.devId + 'getplayer' + config.authKey + utcTime);
    var options = {
      host: 'api.smitegame.com',
      path: '/smiteapi.svc/getplayerjson/' + config.devId + '/' + authHash + '/' + session.session_id + '/' + utcTime + '/' + split[1],
    };
    var response = '';
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
        response = JSON.parse(response);
        console.log(response);
        if (response[0] === undefined)
        {
          bot.emit('response', 'Player has profile hidden', sendTo);
        } else {
          var dateCreated = Date.parse(response[0].Created_Datetime);
          console.log(dateCreated);
          bot.emit('response',
          'Name: ' + response[0].Name
          + '.  Total Wins: ' + response[0].Wins
          + '.  Total Losses: ' + response[0].Losses
          + '.  Win%: ' + Math.round(response[0].Wins / (response[0].Losses + response[0].Wins) * 100)
          + '.  Leaves: ' + response[0].Leaves
          + '.  Mastery Level: ' + response[0].MasteryLevel
          + '.  Total Worshippers: ' + response[0].Total_Worshippers
          + '.  Status: ' + response[0].Personal_Status_Message
          + '.  Account Age: ' + Math.floor((Date.now() - dateCreated) / (1000 * 60 * 60 * 24)) + ' days',
          sendTo);
        }
      });
    }).on('error', function (e) {
        console.log('Got error: ' + e.message);
      });

  };

  function validateAPIToken() {
    var timeNow = new moment();
    var timeAtStamp = Date.parse(session.timestamp);

    // Check here is weird because of time zones, 15 minute check
    if (((timeNow - timeAtStamp) / (1000 * 60)) > 75) {
      smiteSession.genSession()
          .then(function (data) {
          console.log(data);
          session = data;
        }).catch(function (error) {
          console.error(error);
        });
    }
  }

})(module.exports);
