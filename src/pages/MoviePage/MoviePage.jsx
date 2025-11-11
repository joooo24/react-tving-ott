import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import MovieCard from "../../common/MovieCard/MovieCard";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import "./MoviePage.scss";

const MoviePage = () => {
    const [query] = useSearchParams();
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        popularity: "",
        year: "",
    });

    const keyword = query.get("q");

    const handlePageClick = ({ selected }) => {
        setPage(selected + 1);
    };

    const { data, isLoading, isError, error } = useSearchMovieQuery({
        keyword,
        page,
    });

    // 필터링
    const filteredMovies = useMemo(() => {
        if (!data?.results) return [];

        let movies = [...data.results];

        // 연도 필터링
        if (filters.year) {
            movies = movies.filter((movie) => {
                const releaseYear = movie.release_date?.split("-")[0];
                return releaseYear === filters.year;
            });
        }

        // 인기순 정렬
        if (filters.popularity === "high") {
            movies.sort((a, b) => b.popularity - a.popularity);
        } else if (filters.popularity === "low") {
            movies.sort((a, b) => a.popularity - b.popularity);
        }

        return movies;
    }, [data?.results, filters.popularity, filters.year]);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>{error.message}</div>;

    return (
        <Container fluid>
            <Row>
                <Col lg={4} xs={12}>
                    <div className="filter-section">
                        <h4 className="filter-title">필터</h4>

                        <Form.Group className="filter-group">
                            <Form.Label className="filter-label">인기순</Form.Label>
                            <Form.Select
                                className="filter-select"
                                value={filters.popularity}
                                onChange={(e) => setFilters((prev) => ({ ...prev, popularity: e.target.value }))}
                            >
                                <option value="">기본 (인기 높은 순)</option>
                                <option value="high">인기 높은 순</option>
                                <option value="low">인기 낮은 순</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="filter-group">
                            <Form.Label className="filter-label">연도</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="2025"
                                value={filters.year}
                                onChange={(e) => setFilters((prev) => ({ ...prev, year: e.target.value }))}
                                min="1900"
                                max={new Date().getFullYear()}
                            />
                        </Form.Group>
                    </div>
                </Col>

                <Col lg={8} xs={12}>
                    <Row className="movie-list">
                        {/* 필터링된 결과 */}
                        {filteredMovies?.length > 0 ? (
                            filteredMovies.map((movie) => (
                                <Col className="movie-item" key={movie.id} lg={4} xs={6}>
                                    <MovieCard movie={movie} />
                                </Col>
                            ))
                        ) : (
                            <div className="no-results">검색 결과가 없습니다</div>
                        )}
                    </Row>

                    <ReactPaginate
                        nextLabel=">"
                        previousLabel="<"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={data?.total_pages}
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
                        forcePage={page - 1}
                        renderOnZeroPageCount={null}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default MoviePage;
