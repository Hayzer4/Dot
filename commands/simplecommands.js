'use strict';

(function (actions) {

  actions.hello = function () {
    return 'I don\'t like your face';
  };

  actions.c = function (bot, from, to, text, split) {
    return eval(split.splice(1).join(''));
  };

  actions.withagun = function (bot, from, to, text, split) {
    var toReturn = '';
    for (var i = 1; i < split.length; i++) {
      toReturn += split[i];
    }

    return toReturn + " ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿̿ ̿'̿'\̵͇̿̿\ ";
  };

  actions.hayzer = function () {
    return 'Ｈ Ａ Ｙ Ｚ Ｅ Ｒ';
  };

  actions.playlist = function () {
    return 'here is my shitty youtube playlist, it\'s bad https://www.youtube.com/watch?v=8EzfBYFU8Q0&list=PLgi4Oy1KF4CNdVYAFKUOe0mAriE8_jWgS';
  };

  actions.twitter = function () {
    return 'Yo check out dese hot tweets https://www.twitter.com/SmiteHayzer';
  };

  actions.smite = function () {
    return 'You can get Smite at https://www.smitegame.com';
  };

  actions.roast = function () {
    return 'stop streaming you so ugly .man your mother god dam :( you need friends';
  };

  actions.kys = function () {
    return 'no';
  };

  actions.complain = function () {
    return 'The opponent builds throwing dagger. "Oh my god dude, are you kidding me?" says Hayzer. The opponent hits an auto attack. "Seriously dude? How does he do that?" The opponent backs to base. "I can\'t handle this dude, I can\'t beat that." The opponent rotates. "This is some crazy draft RNG bullshit" says Hayzer.';
  };

  actions.fdot = function () {
    return 'Ｆ． ＳＨＡＧＧＥＤ ＭＹ ＤＡＤ';
  };

  actions.eccies = function () {
    return 'What does eccies even mean? Try !points lad / ladette';
  };

  actions.godrequest = function () {
    return 'Go fuck yourself';
  };

  actions.donate = function () {
    return 'Donate here https://www.twitchalerts.com/donate/hayzer4 FeelsGoodMan';
  };

})(module.exports);
