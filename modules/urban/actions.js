'use strict';
var http = require('https');
var colour = require('../../colour');
var helper = require('../../helper');

(function(actions) {
  var startWord;
  var goalWord;
  var wordList = [];
  var lastDefinition;
  actions.query = function(bot, from, to, text, split, sendTo){
    var options = {
      host: 'api.urbandictionary.com',
      port: 443,
		checkServerIdentity: function (host, cert) {
		return;
		},
      path: '/v0/define?term=' + split.slice(1).join('%20')
    };

    var response = '';
    http.get(options, function(res) {
    console.log('Got response: ' + res.statusCode);
    if(res.statusCode !== 200) {
        bot.emit('response', 'http://' + options.host + options.path + ' is unreachable.', sendTo);
        return;
    }

    res.on('data', function(chunk) {
      response += chunk;
      console.log('BODY: ' + chunk);
    });

    res.on('end', function() {
      response = JSON.parse(response);
      console.log(response);
      if(response.result_type === 'exact'){
        var randomArticle = Math.floor((Math.random() * response.list.length));
        var definition    = helper.shorten(
          response.list[Object.keys(response.list)[randomArticle]]
          .definition
          .replace(/\r?\n/g, ''));

        if(startWord && goalWord && !lastDefinition){
          lastDefinition = definition.replace(/\r?\n/g, '').toLowerCase();
        }

        if(lastDefinition && lastDefinition.indexOf(split.slice(1)) > -1 && lastDefinition.indexOf(goalWord) === -1){
            wordList.push(split.slice(1));
            lastDefinition = definition;
            bot.emit('response', colour.bold + 'Bridge Found - Next definition: \n' + colour.normal + lastDefinition, sendTo);
        }else if(lastDefinition && lastDefinition.indexOf(split.slice(1)) > -1 && lastDefinition.indexOf(goalWord) > -1){
            bot.emit('response', colour.red + colour.bold + 'Goal Found - ' + goalWord + colour.normal + '\nSteps: ' + wordList.length + ' - ' + wordList.join(", "), sendTo);
        }else{
            bot.emit('response', 'Definition: ' + definition, sendTo);
        }

      }else{
        bot.emit('response', 'No UD entry for that FeelsBadMan', sendTo);
      }
    });

    }).on('error', function(e) {
        console.log('Got error: ' + e.message);
    });
  };

  actions.battle = function(bot, from, to, text, split, sendTo){
    var array = split.splice(1);
    if(array.length === 2){
      startWord = array[0];
      goalWord = array[1];
      wordList.push(startWord);
      actions.query(bot, from, to, text, ['', startWord], sendTo);
      while (!lastDefinition){
        return 'Use words from the definition of the first word lead to the goal word! \nLet the Urban Battle Begin! Start: ' + colour.bold + startWord + colour.normal + ' Goal: ' + colour.bold + goalWord + '\n.ud ' + startWord;
      }
    }else{
      bot.emit('response', 'Urban Battle is between two words!', sendTo);
    }
  };

  actions.reset = function(){
    startWord = null;
    goalWord = null;
    wordList = [];
    lastDefinition = null;
    return 'Reseting the urban battle.';
  };

})(module.exports);
