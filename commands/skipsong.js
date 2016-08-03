'use strict';
var helper = require('../helper');

(function (actions) {
  var skipped = [];
  var date = new Date;
  var voteStarted = null;
  actions.skip = function (bot, from, to, text, split)
  {
    skipped += from;
    if (voteStarted == null || voteStarted - date.now() > 30000)
    {
      voteStarted = date.now();
      return 'New vote to skip has been started. Type !skip to skip the song, will expire in 30s.'
    }

    if (skipped.length > 4)
    {
      return '!songs skip';
    }
  };
})(module.exports);
