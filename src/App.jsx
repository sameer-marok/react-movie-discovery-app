import React, { useState, useEffect } from "react";
import Search from "./components/search";
import Spinner from "./components/spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3"

// Backend API base URL for recording search terms and fetching trending movies
const BACKEND_API_BASE_URL = "http://localhost:5000/api/search"

// API_OPTIONS: Configuration object for the API request
const TMDB_API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json', // Accept header to specify the expected response format
    Authorization: `Bearer ${API_KEY}` // Authorization header to include the API key for authentication
  }
};

const App = () => {
  // State to hold the current search term entered by the user
  const [searchTerm, setSearchTerm] = useState('')

  // State to hold any error messages from the API
  const [errorMessage, setErrorMessage] = useState('') 

  // state to hold the fetched movies data
  const [movieList, setMovieList] = useState([])

  // state to hold trending movies data
  const [trendingMovies, setTrendingMovies] = useState([])

  const [isLoading, setIsLoading] = useState(false) // State to track loading status

  // State to hold the debounced search term for API requests
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  // Debounce the search term to avoid making API requests on every keystroke
  // by waiting for 500 milliseconds after the user stops typing
  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm)
  }, 500, [searchTerm])

  const fetchMovies = async (query = '') => {
    setIsLoading(true); // Set loading state to true before starting the fetch
    setErrorMessage(''); // Clear any previous error messages
    try {
      const endpoint = query
        ? `${TMDB_API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_API_BASE_URL}/discover/movie?sort_by=popularity.desc`

      // Fetch data from the API using the endpoint and options
      const response = await fetch(endpoint, TMDB_API_OPTIONS);

      if (!response.ok) {
        throw new Error(`Failed to fetch movies. Please try again later.`);
      }

      const data = await response.json();
      
      if (!data.results || data.results.length === 0) {
        setErrorMessage("No movies found.");
        setMovieList([]); // Clear the movie list if no results are found
        return;
      }
      
      // If a search query is provided
      // send a POST request to the backend to record the search term
      if (query) {
        const movie = data.results[0]

        const BACKEND_POST_API_OPTIONS = {
          method: 'POST',
          headers: {
            // Set the content type to JSON for the POST request
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searchTerm: query,
            movieId: movie.id,
            posterUrl: movie.poster_path
          })
        }
      
        // Making a POST request to the backend and checking if the response is successful
        const backendResponse = await fetch(
          BACKEND_API_BASE_URL,
          BACKEND_POST_API_OPTIONS
        );

        if (!backendResponse.ok) {
          throw new Error("Failed to record movie search");
        }
      }
      
      setErrorMessage(''); // Clear any previous error messages
      setMovieList(data.results); // Update the movie list state with the fetched data

    } catch (error) {
        console.error('Error fetching movies:', error);
        setErrorMessage('Failed to fetch movies. Please try again later.');
    } finally {
        setIsLoading(false); // Set loading state to false after the fetch is complete
    }
  }

  const fetchTrendingMovies = async () => {

    try {
      const BACKEND_GET_API_OPTIONS = {
        method: 'GET',
        headers: {
          accept: 'application/json', // Accept header to specify the expected response format
        }
      };

      const endpoint = BACKEND_API_BASE_URL + "/trending"

      const response = await fetch(endpoint, BACKEND_GET_API_OPTIONS);

      if (!response.ok) {
        throw new Error(`Failed to fetch trending movies. Please try again later.`);
      }

      const data = await response.json();

      if (!data || data.length === 0) {
        setTrendingMovies([]); // Clear the movie list if no results are found
        return;
      }

      setTrendingMovies(data)
      
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    }

  }

  useEffect(() => {
    fetchTrendingMovies()
  }, []) // Only need to fetch once when component initially mounts

  // To fetch data from the API
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]) // Fetch movies whenever the debounced search term changes

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero banner"/>
            <h1> Find <span className="text-gradient">Movies</span>
              You'll Enjoy Without the Hassle
            </h1>

            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        <section className="all-movies">
          <h2 className="mt-10">All Movies</h2>

          {isLoading ? (
            <Spinner/>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}

        </section>
      </div>
    </main>
  )
}

export default App