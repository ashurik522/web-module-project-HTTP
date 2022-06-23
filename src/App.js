import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import EditMovieForm from "./components/EditMovieForm";
import MovieHeader from './components/MovieHeader';
import AddMovieForm from "./components/AddMovieForm";
import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const { push } = useHistory()

  useEffect(()=>{
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id)=> {
    axios.delete(`http://localhost:9000/api/movies/${id}`)
            .then(res => {
                setMovies(res.data)
                push("/movies")
            })
            .catch(err => console.log(err))
  }

  const addToFavorites = (movie) => {
    setFavoriteMovies([...favoriteMovies, movie])
    push("/movies")
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader/>
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies}/>
        
          <Switch>
            <Route path="/movies/edit/:id" render={(props)=>{
              return <EditMovieForm {...props} setMovies={setMovies}/>
            }}>
            </Route>
            <Route path="/movies/add" render={(props)=>{
              return <AddMovieForm {...props} setMovies={setMovies}/>
            }}>
            </Route>

            <Route path="/movies/:id" render={(props)=>{
              return   <Movie {...props} addToFavorites={addToFavorites} setMovies={setMovies} deleteMovie={deleteMovie}/>
            }}>
            </Route>

            <Route path="/movies">
              <MovieList movies={movies}/>
            </Route>

            <Route path="/">
              <Redirect to="/movies"/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};


export default App;

