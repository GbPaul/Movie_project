import React, { useState } from "react";
import {Image, Card, Button, Grid, Form, Input} from 'semantic-ui-react';




export default function SearchMovies() {
  

  //states- input query, movies
  const [query, setQuery] = useState('');
  //create the state for movies, and update that state appropriate
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?api_key=0004acb1ff1c0c4f40a530e194798545&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="App">
     <h1>My Movie Page</h1>
     <div className="search-box">
      <Form onSubmit={searchMovies}>
      <Form.Field>
        <label className="label" htmlFor="query">Movie Name: </label>
        <Input className="ui input" type="text" name="query"
          placeholder="i.e. Jurassic Park"
          value={query} onChange={(e) => setQuery(e.target.value)}
        />
        </Form.Field>
        <Button className="ui button" type="submit">Search</Button>
      </Form>
      </div>

      <Grid textAlign="center" style={{maxHeight: "100vh"}}>
        {movies.filter(movie => movie.poster_path).map(movie => (
          <div key={movie.id}>
           <div className="movie">
           <Grid.Column>
          <Card>
              <Image className="ui fluid image"
                src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                alt={movie.title + ' poster'}
              />
          <Card.Content> 
              <Card.Header>Title:{movie.title}</Card.Header>
              <Card.Meta>
                  <span className="date" >RELEASE DATE:{movie.release_date}</span>
              </Card.Meta>
              <Card.Description>
              <p>{movie.overview}</p>
                <p>RATING: {movie.vote_average}</p>
              </Card.Description>
              </Card.Content>
            </Card>
            </Grid.Column>
            </div>
          </div>
        ))}
      </Grid>
      </div>
  
  )
}
