import { Loader } from "lucide-react";
import React, { useState } from "react";
import Navbar from "./Navbar";

// Mood-to-genre mapping with labels
const moodGenreMap = {
    "😂": { label: "Happy", genres: [35] },
    "😭": { label: "Sad", genres: [18] },
    "😱": { label: "Scared", genres: [27, 53] },
    "🤩": { label: "Excited", genres: [12, 28] },
    "🥰": { label: "Romantic", genres: [10749] },
    "🧠": { label: "Thoughtful", genres: [878, 9648] },
    "😎": { label: "Cool", genres: [80, 28] },
    "🧘": { label: "Chill", genres: [99] },
};

// TMDB API Key and headers
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
};

// Fetch movies by genre
const fetchMoviesByGenre = async (genreIds = []) => {
    const page = Math.floor(Math.random() * 5) + 1;
    const genreParam = genreIds.join(',');
    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreParam}&language=en&page=${page}`;
    const response = await fetch(url, { headers });
    const data = await response.json();
    return data.results;
};

const WatchMood = () => {
    const [selectedMood, setSelectedMood] = useState(null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false); // <-- Loading state

    const handleMoodSelect = async (emoji) => {
        setSelectedMood(emoji);
        setLoading(true);
        setMovies([]);

        try {
            const genres = moodGenreMap[emoji].genres;
            const results = await fetchMoviesByGenre(genres);

            // Filter out results without poster_path
            const validMovies = results.filter((movie) => movie.poster_path);
            setMovies(validMovies);
        } catch (error) {
            console.error("Error fetching movies:", error);
            setMovies([]);
        }

        setLoading(false);
    };


    return (
        <>
            <div className="bg-black text-white py-8">
                <Navbar />
            </div>
            <div className="text-white min-h-screen bg-black flex flex-col items-center py-10 px-4">
                <h2 className="text-3xl font-bold mb-6">🎭 Watch by Mood</h2>

                {/* Mood Emojis */}
                <div className="flex flex-wrap gap-6 justify-center mb-10 text-3xl">
                    {Object.entries(moodGenreMap).map(([emoji, { label }]) => (
                        <div key={emoji} className="flex flex-col items-center">
                            <button
                                onClick={() => handleMoodSelect(emoji)}
                                className={`transition-transform duration-200 hover:scale-125 ${selectedMood === emoji ? 'scale-125' : ''
                                    }`}
                            >
                                {emoji}
                            </button>
                            <span className="text-base mt-1">{label}</span>
                        </div>
                    ))}
                </div>

                {/* Spinner */}
                {loading && (
                    <Loader className='animate-spin text-red-600 size-10' />

                )}

                {/* Movies Grid */}
                {!loading && movies.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {movies.map((movie) => (
                            <a
                                key={movie.id}
                                href={`https://www.themoviedb.org/movie/${movie.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-800 rounded-lg p-2 hover:scale-105 transition-transform"
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="rounded mb-2 h-72 object-cover w-full"
                                />
                                <h3 className="text-sm font-semibold text-center">{movie.title}</h3>
                            </a>
                        ))}
                    </div>
                )}

                {/* Show message when no results */}
                {!loading && selectedMood && movies.length === 0 && (
                    <p className="text-gray-400 mt-10">No movies found for this mood or API Fetching issue. Click once again or Try another emoji!</p>
                )}

            </div>
        </>
    );
};

export default WatchMood;
