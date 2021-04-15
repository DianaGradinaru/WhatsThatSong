const form = document.querySelector("#searchform");
const placeholder = document.getElementById("placeholder");
const lyricscontainer = document.querySelector("#lyricscontainer");
const URL =
    "https://serene-garden-36285.herokuapp.com/http://api.musixmatch.com/ws/1.1/";
const apikey = "ae8c1197ad5a0e25f83d21fda7650e63";

async function populateLyrics(track_id) {
    const lyrics = await getLyricsByID(track_id);
    lyricscontainer.innerText = lyrics;
}

function createTitles(track, i) {
    const p = document.createElement("p");
    const a = document.createElement("a");
    a.innerText = track.track_name;
    a.href = "#";
    a.addEventListener("click", (e) => {
        e.preventDefault();
        populateLyrics(track.track_id);
    });
    p.appendChild(a);
    placeholder.appendChild(p);
}

async function getLyricsByID(id) {
    const request = await fetch(
        `${URL}track.lyrics.get?track_id=${id}&apikey=${apikey}`
    );
    if (request.ok) {
        const response = await request.json();
        return response.message.body.lyrics.lyrics_body;
    }
}

async function getTrackIDByLyrics(phrase) {
    const request = await fetch(
        `${URL}track.search?q_lyrics=${phrase}s&apikey=${apikey}`
    );

    if (request.ok) {
        const response = await request.json();
        // trackIds = response.message.body.track_list
        //     .map((t) => t.track.track_id)
        //     .map(async (i) => getLyricsByID(i));

        trackName = response.message.body.track_list
            .map((n) => n.track)
            .map(createTitles);

        return trackName;
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    placeholder.innerHTML = "";
    lyricscontainer.innerHTML = "";
    getTrackIDByLyrics(e.target.phrase.value);
});
