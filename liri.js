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
		if (!songName){
			songName = "The Sign";
		} 
		spotifyThis(songName); 
		break;
	case "movie-this":
		
		getMovie();
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

function getMovie(){
    var movie = process.argv[3];
    if(!movie){
        movie = "mr nobody";
    }
    
    request("http://www.omdbapi.com/?t=" + movie + "&apikey=53a0f854", function(error, response, body) { 
        if (!error && response.statusCode === 200) {
	        var movieObj = JSON.parse(body);
	        console.log("Title: " + movieObj.Title);
	        console.log("Year of Release: " + movieObj.Year);
	        console.log("IMDB Rating: " + movieObj.imdbRating);
	        console.log("Rotten Tomatoes Rating: " + movieObj.Ratings[1].Value);
	        console.log("Countries Produced: " + movieObj.Production);
	        console.log("Language: " + movieObj.Language);
	        console.log("Plot: " + movieObj.Plot);
	        console.log("Cast: " + movieObj.Actors);
	    }
	})
}
                