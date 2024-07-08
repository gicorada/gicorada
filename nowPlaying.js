// Thank you https://github.com/aristada

LASTFM_API_KEY = "45faf84cf916578cf693244e5cfe2d0b"
username = "GR200"
STRING_ID = "music"
url = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&format=json&api_key=" + LASTFM_API_KEY + "&limit=1&user=" + username

const fetchURL = async (url) => {
	var response = await fetch(url);
	return response.json();
}

const updateNowPlaying = async () => {
	var json = await fetchURL(url);
	var last_track = json.recenttracks.track[0];
	var track = last_track.name;
	var trackLink = last_track.url;
	var artist = last_track.artist['#text'];

	var now_playing = (last_track["@attr"] == undefined) ? false : true;

	var html = document.getElementById(STRING_ID);
	if(window.location.href.includes("en/index.html")) {
		html.innerHTML = (now_playing ? "I'm listening to " : "The last song I listened to is ") + "\"" + track + "\" - \"" + artist + "\"" ;
	} else {
		html.innerHTML = (now_playing ? "In questo momento sto ascoltando " : "L'ultima canzone che ho ascoltato è ") + "\"" + track + "\" - \"" + artist + "\"" ;
	}
}

updateNowPlaying();