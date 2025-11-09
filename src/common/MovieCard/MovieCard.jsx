import React from "react";
import "./MovieCard.scss";

const MovieCard = ({ movie }) => {
    return (
        <div
            className="movie-card"
            style={{
                backgroundImage:
                    "url(" + `https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}` + ")",
            }}
        >
            <div className="tag-wrap">
                <span className={`tag ${movie.adult ? "adult" : "all"}`}>{movie.adult ? "19+" : "ALL"}</span>
                {movie.genre_ids?.map((genre) => (
                    <span key={genre} className="tag">
                        {genre}
                    </span>
                ))}
            </div>
            <p className="title">{movie.title}</p>
            <p className="overview">{movie.overview}</p>
            <p className="rating">
                평점: {movie.vote_average} ({movie.vote_count}명 평가)
            </p>
            <p className="release-date">개봉일: {movie.release_date}</p>
        </div>
    );
};

export default MovieCard;
// w300_and_h450_multi_faces_filter
