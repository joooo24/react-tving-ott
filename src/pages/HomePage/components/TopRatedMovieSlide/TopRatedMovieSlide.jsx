import React from "react";
import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRatedMovie";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Alert } from "react-bootstrap";
import MovieCard from "../MovieCard/MovieCard";

const TopRatedMovieSlide = () => {
    const { data, isLoading, isError, error } = useTopRatedMoviesQuery();

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
            slidesToSlide: 6,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1,
        },
    };
    return (
        <div>
            <h3 className="slide-title">TopRated Movie</h3>
            <Carousel
                infinite={true}
                centerMode={true}
                // autoPlay={true}
                itemClass="carousel-item-padding-40-px"
                containerClass="carousel-container"
                responsive={responsive}
            >
                {data?.results?.map((movie, index) => (
                    <MovieCard movie={movie} key={index} />
                ))}
            </Carousel>
        </div>
    );
};

export default TopRatedMovieSlide;
