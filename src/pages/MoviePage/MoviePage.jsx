import React from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import "./MoviePage.scss";

const MoviePage = () => {
    const [query] = useSearchParams();
    const keyword = query.get("q");
    console.log("keyword", keyword);
    const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword });
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>{error.message}</div>;
    }
    console.log("쭈 data", data);
    return (
        <Container fluid>
            <Row>
                <Col lg={4} xs={12}>
                    필터
                </Col>
                <Col lg={8} xs={12}>
                    <Row className="movie-list">
                        {data?.results?.map((movie, index) => (
                            <Col className="movie-item" key={index} lg={4} xs={6}>
                                <MovieCard movie={movie} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default MoviePage;