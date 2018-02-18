// module imports

require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs");

var liri = process.argv[2];

switch(liri){
	case "my-tweets":
		getTweets(); 
		break;
	case "spotify-this-song": 
		var songName = process.argv[3];
		// if () 
		spotifyThis(songName); 
		break;

}



 function getTweets(){
	var client = new Twitter(keys.twitter)
	 
	var params = {screen_name: 'sum_uno'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {

	  if (!error) {
	  	for (var i = 0; i< tweets.length; i++){
	  		console.log(tweets[i].created_at);

	  		console.log(tweets[i].text);	
	  		console.log("\n");
	  	}
	    
	  }
	})
}

function spotifyThis(songName){
	
	
 
	var spotify = new Spotify(keys.spotify);
 
	spotify.search({ type: 'track', query: songName }, function(err, data) {
  		if (err) {
    		return console.log('Error occurred: ' + err);
  		}
  		else {
  			var songInfo = data.tracks.items[0];
  			// output song name
  			console.log(songInfo.artists[0].name)
  			console.log(songInfo.name)
  			console.log(songInfo.preview_url)
  			console.log(songInfo.album.name)
  			
  				

 
			
		}
	});

}

