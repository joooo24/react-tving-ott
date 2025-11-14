import React from "react";
import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovie";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import Loading from "../../../../common/Loading/Loading";

const TopRatedMovieSlide = () => {
    const { data, isLoading, isError, error } = useTopRatedMoviesQuery();

    if (isLoading) {
        return <Loading />;
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    return <MovieSlider movie={data} slideTitle={"TopRate Movie"} />;
};

export default TopRatedMovieSlide;
