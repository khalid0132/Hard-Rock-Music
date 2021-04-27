//const getLyrics = document.getElementById('get_lyrics');
//const searchField = document.getElementById("search_input")

const searchSongs = () => {
  const searchText = document.getElementById("search_input").value;
  document.getElementById("search_input").value = "";
  //   console.log(searchField);
  const url = `https://api.lyrics.ovh/suggest/${searchText}`;
  //   console.log(url);

  // toggleSpinner();
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySongs(data.data))
    .catch((error) =>
      showErrorMessage("Something went wrong, Please try again (errorMessage)")
    ); // for error handle, execute a new function
};

// ENTER key board....
document
  .getElementById("search_input")
  .addEventListener("keypress", function (event) {
    // event.preventDefault();
    // console.log("keycode", event.key);
    if (event.key === "Enter") {
      document.getElementById("buttonClick").click();
    }
  });

// error handle inside the searchSongs function
const showErrorMessage = (error) => {
  const errorTag = document.getElementById("error_message");
  errorTag.innerText = error;
};

// used async and await...........................
// const searchSongs = async () => {
//   // async add kore .then er place a await use kora
//   const searchText = document.getElementById("search_input").value;
//   document.getElementById("search_input").value = "";
//   //   console.log(searchField);
//   const url = `https://api.lyrics.ovh/suggest/${searchText}`;
//   //   console.log(url);

//   //Loading data
//   const res = await fetch(url);
//   const data = await res.json();
//   displaySongs(data.data);};

const displaySongs = (songs) => {
  //   console.log(songs);
  const songContainer = document.getElementById("song_container");
  songContainer.innerHTML = "";
  songs.forEach((song) => {
    // console.log(song.title);
    const songDiv = document.createElement("div");
    songDiv.className = "something";
    songDiv.innerHTML = `
        <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/ogg">
            </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${song.artist.name}', '${song.title}')" id="get_lyrics" class="btn btn-success">Get Lyrics</button>
            </div>
        </div>
    `;
    // console.log(li.innerText);

    songContainer.appendChild(songDiv);
  });
};

const getLyrics = async (artist, title) => {
  //   console.log(artist, title);
  const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
  //   console.log(url);
  // async, await er jonno try{} catch(error){}
  try {
    const res = await fetch(url);
    const data = await res.json();
    showLyrics(data.lyrics);
  } catch (error) {
    showErrorMessage("Wrong, something wrong, be cool...");
  }

  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => showLyrics(data.lyrics));
};

const showLyrics = (lyrics) => {
  const showLyricsDiv = document.getElementById("show_lyrics");
  showLyricsDiv.innerText = lyrics;
};

// toggle::::
// const toggleSpinner = () => {
//   const spinner = document.getElementById("loading_spinner");
//   spinner.classList.toggle('d-md-none');
//   // spinner.classList.remove("d-md-none");
//   // spinner.classList.add("d-md-none");
// };
