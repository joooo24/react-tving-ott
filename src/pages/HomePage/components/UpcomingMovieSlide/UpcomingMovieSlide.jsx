import React from "react";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpcomingMovie";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import Loading from "../../../../common/Loading/Loading";

const UpcomingMovieSlide = () => {
    const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

    if (isLoading) {
        return <Loading />;
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    return <MovieSlider movie={data} slideTitle={"Upcoming Movie"} />;
};

export default UpcomingMovieSlide;
