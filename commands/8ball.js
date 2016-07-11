'use strict';
var helper = require('../helper');
var colour = require('../colour');

(function (actions) {
  var options = ['Aye', 'Naw', 'If you want lad', 'Deffo not u mad man',
  'Outlook is foggy', 'I\'m not your dad', 'just kys', 'Mibbe aye mibbe naw'];

  actions.trigger = function () {

    return helper.choose(options);

  };

})(module.exports);
