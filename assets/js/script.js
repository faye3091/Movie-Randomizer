var generateBtnEl = document.querySelector("#generateBtn");
var imageEl = document.querySelector("#movie-image");

var titleEl = document.querySelector("#movie-title");
var plotEl = document.querySelector("#movie-plot");
var infoEl = document.querySelector("#more-info");
generateBtnEl.addEventListener("click", randomMovie);

function randomMovie() {
  var movieUrl = "https://imdb-api.com/en/API/Top250Movies/k_rljzd128";

  fetch(movieUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          var randomIndex = Math.floor(Math.random() * data.items.length);
          console.log(data.items[randomIndex].id);
          var movieId = data.items[randomIndex].id;

          getMovie(movieId);
        });
      } else {
        alert("error");
      }
    })
    .catch(function (error) {
      alert("unable to connect to the movieAPI");
    });
}

function getMovie(movieId) {
  var movieUrl =
    "https://imdb-api.com/en/API/Title/k_rljzd128/" +
    movieId +
    "/FullActor,Posters";
  fetch(movieUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          renderMovieInfo(data);
        });
      } else {
        alert("error id");
      }
    })
    .catch(function (error) {
      alert("unable to connect to the movieAPI");
    });
}
function renderMovieInfo(movieInfo){
var img = document.createElement("img");
img.src= movieInfo.image;
imageEl.appendChild(img);
}
randomMovie();
