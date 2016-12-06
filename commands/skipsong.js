'use strict';
var skipped = new Array(String);
var skipCount = 0;
var voteStarted = null;
// This code SUCKS but for some reason it wasn't working using the Array as the count

(function (actions) {

  actions.skip = function (bot, from, to, text, split)
  {
    console.log('Entered skip');
    if (voteStarted == null || (Math.floor((new Date() - voteStarted) / 1000) > 60))
    {
      console.log('entered if');
      voteStarted = new Date();
      skipped = from;
      skipCount = 1;
      return 'New vote to skip has been started. Type !skip to skip the song, vote expires in 60s.';
    } else if (skipped.indexOf(from) > -1)
    {
      return 'You already voted ' + from + '!';
    } else {
      console.log('else');
      skipped += from;
      skipCount++;
    }

    if (skipCount > 6)
    {
      console.log('2nd if');
      skipped = [];
      voteStarted = null;
      skipCount = 0;
      return '!songs skip';
    } else
    {
      return 'Vote recorded ' + from + '; ' + skipCount + ' votes recorded';
    }
  };
})(module.exports);
