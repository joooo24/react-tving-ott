import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usepopularMovie";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Alert } from "react-bootstrap";
import MovieCard from "../MovieCard/MovieCard";

const PopularMovieSlide = () => {
    const { data, isLoading, isError, error } = usePopularMoviesQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 8, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };
    return (
        <div>
            <h3>PopularMovies</h3>
            <Carousel
                infinite={true}
                centerMode={true}
                autoPlay={true}
                itemClass="carousel-item-padding-40-px"
                containerClass="carousel-container"
                responsive={responsive}
            >
                {data.results.map((movie, index) => (
                    <MovieCard data={movie} key={index} />
                ))}
            </Carousel>
        </div>
    );
};

export default PopularMovieSlide;
