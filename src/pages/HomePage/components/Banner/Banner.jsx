import React from "react";
import "./Banner.scss";
import { usePopularMoviesQuery } from "../../../../hooks/usepopularMovie";
import { Alert } from "react-bootstrap";
import Loading from "../../../../common/Loading/Loading";

const Banner = () => {
    const { data, isLoading, isError, error } = usePopularMoviesQuery();
    console.log("Banner data: ", data);

    if (isLoading) {
        return <Loading />;
    }
    if (isError) {
        return <Alert variant="danger">{error.message}</Alert>;
    }
    return (
        <div
            style={{
                backgroundImage:
                    "url(" +
                    `https://media.themoviedb.org/t/p/w533_and_h300_bestv2${data.results[0].poster_path}` +
                    ")",
            }}
            className="banner"
        >
            <h4 className="title">{data?.results[0].title}</h4>
            <p className="overview">{data?.results[0].overview}</p>
        </div>
    );
};

export default Banner;
