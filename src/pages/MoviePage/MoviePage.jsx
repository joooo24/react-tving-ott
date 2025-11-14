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
    const itemsPerPage = 20; // 페이지당 아이템 수
    const [filters, setFilters] = useState({
        popularity: "",
        year: "",
    });

    const keyword = query.get("q");

    // 키워드 변경 시 페이지 리셋
    useEffect(() => {
        setPage(1);
    }, [keyword]);

    // 필터 변경 시 페이지 리셋
    useEffect(() => {
        setPage(1);
    }, [filters.year, filters.popularity]);

    const handlePageClick = ({ selected }) => {
        setPage(selected + 1);
    };

    // 500개(25페이지) 가져오기
    const { data: allMovies, isLoading, isError, error } = useSearchMovieQuery({ keyword });

    // 클라이언트 사이드 필터링
    const filteredMovies = useMemo(() => {
        if (!allMovies || allMovies.length === 0) return [];

        let movies = [...allMovies];

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
    }, [allMovies, filters.popularity, filters.year]);

    // 현재 페이지에 보여줄 데이터 (페이지네이션 적용)
    const paginatedMovies = useMemo(() => {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredMovies.slice(startIndex, endIndex);
    }, [filteredMovies, page, itemsPerPage]);

    // 필터링된 결과의 총 페이지 수
    const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

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

                        {/* 필터링된 결과 수 표시 */}
                        {(filters.year || filters.popularity) && (
                            <div className="filter-info">
                                필터링된 결과: <span>{filteredMovies.length}</span>개
                            </div>
                        )}
                    </div>
                </Col>

                <Col lg={8} xs={12}>
                    {isLoading ? (
                        <div className="loading">Loading...</div>
                    ) : isError ? (
                        <div className="error">{error?.message || "에러가 발생했습니다"}</div>
                    ) : (
                        <>
                            <Row className="movie-list">
                                {/* 페이지네이션된 필터링 결과 */}
                                {paginatedMovies?.length > 0 ? (
                                    paginatedMovies.map((movie) => (
                                        <Col className="movie-item" key={movie.id} lg={4} xs={6}>
                                            <MovieCard movie={movie} />
                                        </Col>
                                    ))
                                ) : (
                                    <div className="no-results">검색 결과가 없습니다</div>
                                )}
                            </Row>

                            {/* 필터링된 결과 기준 페이지네이션 */}
                            {filteredMovies?.length > 0 && totalPages > 1 && (
                                <ReactPaginate
                                    nextLabel=">"
                                    previousLabel="<"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={5}
                                    marginPagesDisplayed={false}
                                    pageCount={totalPages}
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
                            )}
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default MoviePage;
