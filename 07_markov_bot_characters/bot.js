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

// Load some data in from Corpora
var txt = fs.readFileSync('corpora/animals/dinosaurs.json', 'utf8');
var data = JSON.parse(txt);
var dinos = data.dinosaurs;

// Now using rita.js!
var Markov = require('./markov').MarkovGenerator;
var generator = new Markov(3, 20);

for (var i = 0; i < dinos.length; i++) {
  generator.feed(dinos[i] + '.');
}

function generate() {
  var status = 'I discovered a new dino and named it ' + generator.generate();
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