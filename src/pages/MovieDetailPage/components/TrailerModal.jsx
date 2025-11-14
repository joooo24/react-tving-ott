import React from "react";
import { Modal } from "react-bootstrap";
import YouTube from "react-youtube";
import { useMovieTrailerQuery } from "../../../hooks/useMovieTrailer";
import Loading from "../../../common/Loading/Loading";

const TrailerModal = ({ show, onHide, movieId }) => {
    const { data: trailerData, isLoading, isError } = useMovieTrailerQuery(movieId);

    // Trailer 타입의 비디오 찾기 (또는 첫 번째 비디오)
    const trailers = trailerData?.results?.filter((video) => video.type === "Trailer") || [];
    const video = trailers.length > 0 ? trailers[0] : trailerData?.results?.[0];
    const videoId = video?.key || null;

    // YouTube 플레이어 옵션
    const opts = {
        playerVars: {
            autoplay: 1, // 자동 재생
            controls: 1, // 컨트롤 표시
            mute: 1,     // 음소거 (소리 꺼진 상태로 시작)
        },
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>예고편</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoading ? (
                    <div className="modal-loading">
                        <Loading />
                    </div>
                ) : isError ? (
                    <div className="modal-error">예고편을 불러올 수 없습니다</div>
                ) : !videoId ? (
                    <div className="modal-no-trailer">예고편이 없습니다</div>
                ) : (
                    <div className="youtube-container">
                        <YouTube videoId={videoId} opts={opts} />
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default TrailerModal;
