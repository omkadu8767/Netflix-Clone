import React, { useEffect, useState } from "react";
import { fetchPopularMovies } from "../utils/tmdb";
import Navbar from "./Navbar";

const GuessTheMovie = () => {
    const [movies, setMovies] = useState([]);
    const [correctMovie, setCorrectMovie] = useState(null);
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        loadGame();
    }, []);

    const loadGame = async () => {
        const movieList = await fetchPopularMovies();
        const randomIndex = Math.floor(Math.random() * movieList.length);
        const correct = movieList[randomIndex];
        const otherOptions = movieList
            .filter(m => m.id !== correct.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        const finalOptions = [...otherOptions, correct].sort(() => 0.5 - Math.random());

        setMovies(movieList);
        setCorrectMovie(correct);
        setOptions(finalOptions);
        setSelected(null);
        setShowResult(false);
    };

    const handleGuess = (title) => {
        setSelected(title);
        setShowResult(true);
    };

    return (
        <>
            <div className="bg-black text-white py-8">
                <Navbar />
            </div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
                <h1 className="text-3xl font-bold mb-6">🎬 Guess the Movie</h1>

                {correctMovie && (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${correctMovie.poster_path}`}
                        alt="movie poster"
                        className={`w-64 h-96 object-cover mb-6 rounded-lg transition-all duration-500 ${showResult ? 'blur-0' : 'blur-[7px]'
                            }`}
                    />
                )}

                <div className="grid grid-cols-2 gap-4">
                    {options.map((movie, index) => (
                        <button
                            key={index}
                            onClick={() => handleGuess(movie.title)}
                            className={`px-4 py-2 rounded-lg transition-all duration-200 ${showResult
                                ? movie.title === correctMovie.title
                                    ? 'bg-green-600'
                                    : movie.title === selected
                                        ? 'bg-red-600'
                                        : 'bg-gray-700'
                                : 'bg-gray-700 hover:bg-blue-500'
                                }`}
                            disabled={showResult}
                        >
                            {movie.title}
                        </button>
                    ))}
                </div>

                {showResult && (
                    <div className="mt-6 text-xl font-semibold text-center">
                        {selected === correctMovie.title ? (
                            <p className="text-green-400">✅ Correct!</p>
                        ) : (
                            <p className="text-red-400">
                                ❌ Wrong! The correct answer was <span className="text-white font-bold">{correctMovie.title}</span>
                            </p>
                        )}
                        <button
                            onClick={loadGame}
                            className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                        >
                            Try Another
                        </button>
                    </div>
                )}
            </div>

        </>
    );
};

export default GuessTheMovie;
