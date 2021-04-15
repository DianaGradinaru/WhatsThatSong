const search_phrase = "never";

const URL = `https://serene-garden-36285.herokuapp.com/http://api.musixmatch.com/ws/1.1/`;

async function getLyricsByID(id) {
    const request = await fetch(
        `${URL}track.lyrics.get?track_id=${id}&apikey=ae8c1197ad5a0e25f83d21fda7650e63`
    );
    const response = await request.json();
    if (request.ok) {
        console.log(response.message.body.lyrics.lyrics_body);
        return response.message.body.lyrics.lyrics_body;
    }
}

async function getTrackIDByLyrics() {
    const request = await fetch(
        `${URL}track.search?q_lyrics=${search_phrase}s&apikey=ae8c1197ad5a0e25f83d21fda7650e63`
    );
    const response = await request.json();

    if (request.ok) {
        const trackIds = response.message.body.track_list
            .map((t) => t.track.track_id)
            .map(getLyricsByID);
        return trackIds;
    }
}
const ids = getTrackIDByLyrics();
ids.then((lyric) => {
    console.log(lyric);
});
console.log(ids);
