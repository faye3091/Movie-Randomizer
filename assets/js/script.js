var generateBtnEl = document.querySelector("#generateBtn");
var imageEl = document.querySelector("#movie-image");
var movieMoreInfo = document.querySelector(".movie-info");
var titleEl = document.querySelector("#movie-title");
var plotEl = document.querySelector("#movie-plot");
var infoEl = document.querySelector("#more-info");
generateBtnEl.addEventListener("click", randomMovie);
var movieApi = "k_rljzd128";

function randomMovie() {
  var movieUrl = "https://imdb-api.com/en/API/Top250Movies/" + movieApi;
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
    "https://imdb-api.com/en/API/Title/" +
    movieApi +
    "/" +
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

function renderMovieInfo(movieInfo) {
  //to show image
  var img = document.createElement("img");
  img.src = movieInfo.image;
  imageEl.appendChild(img);

  //to show Movie Title
  var title = document.createElement("h2");
  title.innerHTML = "<strong>" + movieInfo.fullTitle + "</strong>";
  titleEl.appendChild(title);

  //to show summary plot
  var summary = document.createElement("p");
  summary.innerHTML = "Summary: " + movieInfo.plot;
  plotEl.appendChild(summary);

  //to show directors of the movie
  var directors = document.createElement("p");
  directors.innerHTML = "Directors: " + movieInfo.directors;
  infoEl.appendChild(directors);

  //to show directors of the movie
  var awards = document.createElement("p");
  awards.innerHTML = "Awards: " + movieInfo.awards;
  infoEl.appendChild(awards);

  //to show directors of the movie
  var runTime = document.createElement("p");
  runTime.innerHTML = "Run Time: " + movieInfo.runtimeStr;
  infoEl.appendChild(runTime);

  var movieLink = document.createElement("a");
  movieLink.setAttribute("href", "./movie-info.html?movieId=" + movieInfo.id);
  movieLink.innerHTML = "Click here for Streaming Info";
  infoEl.appendChild(movieLink);
  movieMoreInfo.style.display = "block";
}

/*
    "./movie-info.html?movieId=" +
      movieInfo.id +
      "?movietitle=" +
      movieInfo.fullTitle
      */
