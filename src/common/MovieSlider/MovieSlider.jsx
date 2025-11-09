import React from "react";
import "./MovieSlider.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";

const MovieSlider = ({ movie, slideTitle }) => {
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
            <h3 className="slide-title">{slideTitle}</h3>
            <Carousel
                infinite={true}
                centerMode={true}
                // autoPlay={true}
                itemClass="carousel-item-padding-40-px"
                containerClass="carousel-container"
                responsive={responsive}
            >
                {movie?.results?.map((movie, index) => (
                    <MovieCard movie={movie} key={index} />
                ))}
            </Carousel>
        </div>
    );
};

export default MovieSlider;
