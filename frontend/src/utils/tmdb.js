const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
};

// ✅ To fetch genres
export const fetchGenres = async () => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
    const response = await fetch(url, { headers });
    const data = await response.json();
    return data.genres;
};

// ✅ To fetch popular movies
export const fetchPopularMovies = async () => {
    const page = Math.floor(Math.random() * 10) + 1;
    const url = `https://api.themoviedb.org/3/movie/popular?language=en&page=${page}`;
    const response = await fetch(url, { headers });
    const data = await response.json();
    return data.results;
};

// ✅ NEW: To fetch movies based on genre(s)
export const fetchMoviesByGenre = async (genreIds = []) => {
    const page = Math.floor(Math.random() * 5) + 1; // Add randomness
    const genreParam = genreIds.join(',');
    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreParam}&language=en&page=${page}`;
    const response = await fetch(url, { headers });
    const data = await response.json();
    return data.results;
};
