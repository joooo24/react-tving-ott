import React from "react";
import "./Banner.scss";
import { usePopularMoviesQuery } from "../../../../hooks/usepopularMovie";

const Banner = () => {
    const { data, isLoading, isError, error } = usePopularMoviesQuery();
    console.log("Banner data: ", data);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>{error.message}</div>;
    }
    return <div>Banner</div>;
};

export default Banner;
