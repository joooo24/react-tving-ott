import React from "react";
import { useUpcomingMoviesQuery } from "../../../../hooks/useUpcomingMovie";
import { Alert } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";

const UpcomingMovieSlide = () => {
    const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }

    return <MovieSlider movie={data} slideTitle={"Upcoming Movie"} />;
};

export default UpcomingMovieSlide;
