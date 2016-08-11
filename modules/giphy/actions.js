'use strict';
var giphy = require('giphy-api')();

(function (actions) {
  actions.getGif = function(bot, from, to, text, split, sendTo) {
    var searchTerm = split.slice(1).join('%20');
    giphy.search(searchTerm, function(err, res) {
      if (res.data.length != 0) {
        var randomGif = Math.floor((Math.random() * res.data.length));
        bot.emit('response', res.data[randomGif].bitly_gif_url, sendTo);
      } else {
        bot.emit('response', 'no gifs found FeelsBadMan', sendTo);
      }
    });
  };

})(module.exports);
