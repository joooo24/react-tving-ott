import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useMovieDetailQuery } from "../../hooks/useMovieDetail";
import { useMovieRecommendationsQuery } from "../../hooks/useMovieRecommendations";
import { useMovieReviewsQuery } from "../../hooks/useMovieReviews";
import MovieSlider from "../../common/MovieSlider/MovieSlider";
import ReviewCard from "./components/ReviewCard";
import "./MovieDetailPage.scss";

const MovieDetailPage = () => {
    const { id } = useParams();
    const { data: movie, isLoading, isError, error } = useMovieDetailQuery(id);
    const { data: recommendations, isLoading: isRecommendationsLoading } = useMovieRecommendationsQuery(id);
    const { data: reviews, isLoading: isReviewsLoading } = useMovieReviewsQuery(id);

    const formatBudget = (budget) => {
        if (!budget) return "정보 없음";
        return budget.toLocaleString("ko-KR"); // 숫자를 한국어 형식(천 단위 구분)으로 변환
    };

    // 각 리뷰의 확장 상태
    const [expandedReviews, setExpandedReviews] = useState({});

    const toggleReview = (reviewId) => {
        setExpandedReviews((prev) => ({
            ...prev,
            [reviewId]: !prev[reviewId],
        }));
    };

    // 리뷰 텍스트를 자르는 함수 (예: 200자)
    const truncateText = (text, maxLength = 200) => {
        if (!text) return "";
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
    };

    if (isLoading) {
        return (
            <Container className="movie-detail-page">
                <div className="loading">Loading...</div>
            </Container>
        );
    }

    if (isError) {
        return (
            <Container className="movie-detail-page">
                <div className="error">{error?.message || "에러가 발생했습니다"}</div>
            </Container>
        );
    }

    if (!movie) {
        return (
            <Container className="movie-detail-page">
                <div className="no-contents">영화 정보를 찾을 수 없습니다</div>
            </Container>
        );
    }

    return (
        <Container className="movie-detail-page">
            <Row className="movie-detail-content">
                <Col lg={4} xs={12} className="poster-section">
                    <img
                        src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
                        alt={movie.title}
                        className="movie-poster"
                    />
                </Col>

                <Col lg={8} xs={12} className="info-section">
                    <h1 className="movie-title">{movie.title}</h1>

                    <div className="movie-genres">
                        {movie.genres?.length ? (
                            movie.genres.map((genre) => (
                                <span key={genre.id} className="genre-tag">
                                    {genre.name}
                                </span>
                            ))
                        ) : (
                            <span className="no-data">장르 정보 없음</span>
                        )}
                    </div>

                    <div className="movie-info-item">
                        <span className="info-label">인기도</span>
                        <span className="info-value">{movie.popularity?.toFixed(1) ?? "정보 없음"}</span>
                    </div>

                    <div className="movie-info-item">
                        <span className="info-label">줄거리</span>
                        <p className="movie-overview">{movie.overview || "줄거리 정보가 없습니다."}</p>
                    </div>

                    <div className="movie-info-item">
                        <span className="info-label">예산</span>
                        <span className="info-value">{formatBudget(movie.budget)}</span>
                    </div>

                    <div className="movie-info-item">
                        <span className="info-label">개봉일</span>
                        <span className="info-value">{movie.release_date || "정보 없음"}</span>
                    </div>
                </Col>
            </Row>

            {!isRecommendationsLoading && recommendations?.results?.length > 0 && (
                <Row className="related-movies-section">
                    <Col xs={12}>
                        <MovieSlider movie={recommendations} slideTitle="Related Movies" />
                    </Col>
                </Row>
            )}

            <Row className="reviews-section">
                <Col xs={12}>
                    <h3 className="section-title">Reviews</h3>
                    {!isReviewsLoading ? (
                        reviews?.results?.length > 0 ? (
                            <div className="reviews-list">
                                {reviews.results.map((review) => (
                                    <ReviewCard
                                        key={review.id}
                                        review={review}
                                        isExpanded={expandedReviews[review.id]}
                                        onToggle={toggleReview}
                                        truncateText={truncateText}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="no-reviews">리뷰가 없습니다</div>
                        )
                    ) : null}
                </Col>
            </Row>

            <Row>
                <h3>Trailer</h3>
            </Row>
        </Container>
    );
};

export default MovieDetailPage;
