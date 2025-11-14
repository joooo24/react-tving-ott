import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usepopularMovie";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import Loading from "../../../../common/Loading/Loading";

const PopularMovieSlide = () => {
    const { data, isLoading, isError, error } = usePopularMoviesQuery();

    if (isLoading) {
        return <Loading />;
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    return <MovieSlider movie={data} slideTitle={"Popular Movie"} />;
};

export default PopularMovieSlide;
