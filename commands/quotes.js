//Lets load the mongoose module in our program
var mongoose = require('mongoose');

//Lets connect to our database using the DB server URL.
mongoose.connect('mongodb://localhost/quotes');

/**
 * Lets define our Model for User entity. This model represents a collection in the database.
 * We define the possible schema of User document and data types of each field.
 * */
var Quote = mongoose.model('Quote', { quote: String, author: String });

(function (actions) {

  actions.newquote = function (bot, from, to, text, split, sendTo) {
    var parse = split.splice(1).join(' ').split(' - ');
    var quote1 = new Quote({ quote: parse[0], author: parse[1] });

    //Lets save it
    quote1.save(function (err, userObj) {
      if (err) {
        console.log(err);
      } else {
        console.log('saved successfully:', userObj);
      }
    });
  };

})(module.exports);
