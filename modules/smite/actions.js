(function(actions) {
  var smiteSession = require('smite-session');

smiteSession.set({
    devId: config.devId,
    authKey: config.authKey
});

smiteSession.genSession()
    .then(function(data){
    console.log(data);
}).catch(function(error){
    console.error(error);
});
}
