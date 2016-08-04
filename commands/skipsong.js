'use strict';
var skipped = new Array(String);
var skipCount = 0;
var date = new Date();
var voteStarted = null;
// This code SUCKS but for some reason it wasn't working using the Array as the count

(function (actions) {

  actions.skip = function (bot, from, to, text, split)
  {
    console.log('Entered skip');
    if (voteStarted == null || (date.getTime() - voteStarted) > 30000)
    {
      console.log('entered if');
      voteStarted = date.getTime();
      skipped = from;
      skipCount++;
      return 'New vote to skip has been started. Type !skip to skip the song, vote expires in 30s.';
    } else if (skipped.indexOf(from) > -1)
    {
      return 'You already voted ' + from + '!';
    } else {
      console.log('else');
      skipped += from;
      skipCount ++;
    }

    if (skipCount > 4)
    {
      console.log('2nd if');
      skipped = [];
      voteStarted = null;
      skipCount = 0;
      return '!songs skip';
    } else
    {
      return 'Vote recorded ' + from;
    }
  };
})(module.exports);
