import React from "react";
import "./MovieSlider.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";
import { responsive } from "../../constants/responsive";

const MovieSlider = ({ movie, slideTitle }) => {
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
