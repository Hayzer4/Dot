'use strict';
var helper = require('../helper');
var colour = require('../colour');

(function (actions) {
  var options = ['Aye', 'Naw', 'If you want lad', 'Deffo not u mad man',
  'Outlook is foggy', 'I\'m not your dad'];

  actions.trigger = function () {

    return helper.choose(['Aye', 'Naw', 'If you want lad', 'Deffo not u mad man',
    'Outlook is foggy', 'I\'m not your dad']);

  };

  actions.spin = function () {
      return helper.choose(['Aye', 'Naw', 'If you want lad', 'Deffo not u mad man',
      'Outlook is foggy', 'I\'m not your dad']);
    };
})(module.exports);
