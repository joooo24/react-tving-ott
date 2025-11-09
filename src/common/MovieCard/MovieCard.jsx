import React from "react";
import "./MovieCard.scss";
import { useMoiveGenreQuery } from "../../hooks/useMovieGenre";

const MovieCard = ({ movie }) => {
    const { data: genreData } = useMoiveGenreQuery();
    console.log("장르", genreData);

    const showGenre = (genreIdList) => {
        if (!genreIdList || !genreData) return [];

        const genreNameList = genreIdList.map((id) => {
            // genreData에서 id와 일치하는 장르 객체 찾기
            const genreObj = genreData.find((genre) => genre.id === id);
            // 찾은 장르 객체의 name 속성 반환 (없으면 undefined)
            return genreObj?.name;
        });
        return genreNameList;
    };

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
                {showGenre(movie.genre_ids)?.map((genre) => (
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
