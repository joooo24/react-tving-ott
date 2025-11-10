import React, { useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import "./MoviePage.scss";
import ReactPaginate from "react-paginate";

const MoviePage = () => {
    const [query] = useSearchParams();
    const [page, setPage] = useState(1);

    const keyword = query.get("q");

    const handlePageClick = ({ selected }) => {
        setPage(selected + 1);
    };

    const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });
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
                        {data?.results?.length > 0 ? (
                            <Row className="movie-list">
                                {data.results.map((movie, index) => (
                                    <Col className="movie-item" key={index} lg={4} xs={6}>
                                        <MovieCard movie={movie} />
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <div style={{ textAlign: "center", padding: "40px", color: "#fff" }}>
                                검색 결과가 없습니다
                            </div>
                        )}
                    </Row>

                    <ReactPaginate
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={data?.total_pages} // 전체페이지
                        previousLabel="<"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                        forcePage={page - 1}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default MoviePage;
