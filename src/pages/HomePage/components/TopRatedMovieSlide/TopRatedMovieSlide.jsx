import React from "react";
import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovie";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";

const TopRatedMovieSlide = () => {
    const { data, isLoading, isError, error } = useTopRatedMoviesQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    return <MovieSlider movie={data} slideTitle={"TopRate Movie"} />;
};

export default TopRatedMovieSlide;
