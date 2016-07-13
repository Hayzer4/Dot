var jsonObj = require('./global_emotes.json');

(function (actions) {

  actions.trigger = function () {
    return (randomProperty(jsonObj));

    // for (var key in Object.keys(jsonObj)) {
    //   console.log(jsonObj[key].stringify());
    // }
  };

  var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return keys[keys.length * Math.random() << 0];
  };

})(module.exports);
