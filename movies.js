"use strict";
const axios = require("axios");
let mermoy ={}
async function movieshandler(req, res) {
 
  const searchQuery = req.query.searchQuery;
  if (mermoy[searchQuery] != undefined) {
    res.status(200).send( mermoy[searchQuery] );
    
  } else {
    
  const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
  

  axios
    .get(URL)
    .then((result) => {
      let moviesArray = result.data.results.map((item) => {
        
        return new Movie(item);
      });
      mermoy[searchQuery] =moviesArray;
      res.status(200).send(moviesArray);
    })
    .catch((error) => {
      res.status(404).send(error);
    }); 
   
}}
class Movie {
  constructor(item) {
    this.title = item.title;
    this.average_votes = item.vote_average;
    this.totalVotes = item.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
    this.popularity = item.popularity;
    this.released_on = item.release_date;
  }
}
module.exports=movieshandler;