import React, { useState, useEffect } from 'react';
import './App.css';
import MovieBox from './Movie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';

const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=909448db0a6a9d90697238b994e02d82";
const url = "https://api.themoviedb.org/3/search/movie?api_key=909448db0a6a9d90697238b994e02d82&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);

  const searchMovie = async (e) => {
    e.preventDefault();
    console.log("Searching");
    try {
      const urlWithQuery = `${url}${query}`; 
      const res = await fetch(urlWithQuery);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    } catch (error) {
      console.error(error); 
    }
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/home">MovieMania</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />

          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-3" style={{ maxHeight: '100px' }} navbarScroll>
            </Nav>

            <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
              <FormControl
                type="search"
                placeholder="Search Movies"
                className="me-2"
                aria-label="search"
                name="query"
                value={query}
                onChange={changeHandler}
              />
              <Button variant="secondary" type="submit">
                SEARCH
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        {movies.length > 0 ? (
          <div className="container">
            <div className="grid">
              {movies.map((movieReq) => (
                <MovieBox key={movieReq.id} {...movieReq} />
              ))}
            </div>
          </div>
        ) : (
          <h2>No Movies Found</h2>
        )}
      </div>
    </>
  );
}

export default App;