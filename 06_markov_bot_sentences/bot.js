// SFPC Bot Workshop
// Daniel Shiffman
// https://github.com/shiffman/SFPC-Twitter-Bot-Workshop

// Using the Twit node package
// https://github.com/ttezel/twit
var Twit = require('twit');

// Pulling all my twitter account info from another file
var config = require('./config.js');

// File system for loading text files
var fs = require('fs');

// Now using rita.js!
var rita = require('rita');
var markov = new rita.RiMarkov(3, true);

var txt = fs.readFileSync('data/austen.txt', 'utf8');
markov.loadText(txt);

function generate() {
  var status = markov.generateSentences(1)[0];
  var maxlen = 144;
  if (status.length > maxlen) {
    status = status.substring(0, maxlen);
  }
  return status;
}

// Making a Twit object for connection to the API
var T = new Twit(config);

// Start once
tweeter();

// Once every N milliseconds
setInterval(tweeter, 1000*60*5);

// Here is the bot!
function tweeter() {

  // This is a random number bot
  var tweet = generate();
  
  // Post that tweet!
  T.post('statuses/update', { status: tweet }, tweeted);

  // Callback for when the tweet is sent
  function tweeted(err, data, response) {
    if (err) {
      console.log(err);
    } else {
      console.log('Success: ' + data.text);
    }
  };
}