async function searchInLyrics() {
    // event.preventDefault();
    const request = await fetch(
        // "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=json&callback=callback&q_lyrics=imagine",
        "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=json&callback=callback&q_track=imagine&apikey=ae8c1197ad5a0e25f83d21fda7650e63",
        {
            headers: {
                "Content-type": "application/json",
                "X-Auth-Token": "ae8c1197ad5a0e25f83d21fda7650e63",
            },
        }
    );
    const response = await request.json();

    console.log(response);
}

searchInLyrics();
