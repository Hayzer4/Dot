var jsonObj = require('./global_emotes.json');

(function (actions) {

  actions.trigger = function () {
    console.log('entered trigger');
    console.log(randomProperty(jsonObj));
    return (randomProperty(jsonObj));

    // for (var key in Object.keys(jsonObj)) {
    //   console.log(jsonObj[key].stringify());
    // }
  };

  var randomProperty = function (obj) {
    console.log('entered randomProperty');
    var keys = Object.keys(obj);
    return keys[keys.length * Math.random() << 0];
  };

})(module.exports);
