import React from "react";
import { useMovieTrailerQuery } from "../../../hooks/useMovieTrailer";
import Loading from "../../../common/Loading/Loading";

const TrailerIframe = ({ movieId }) => {
    const { data: trailerData, isLoading, isError } = useMovieTrailerQuery(movieId);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div className="trailer-error">예고편을 불러올 수 없습니다</div>;
    }

    // Trailer 타입의 비디오 찾기 (또는 첫 번째 비디오)
    const trailers = trailerData?.results?.filter((video) => video.type === "Trailer") || [];
    const video = trailers.length > 0 ? trailers[0] : trailerData?.results?.[0];

    if (!video || !video.key) {
        return <div className="no-trailer">예고편이 없습니다</div>;
    }

    return (
        <div className="trailer-wrapper">
            <div className="trailer-iframe-container">
                <iframe
                    width="100%"
                    height="500"
                    src={`https://www.youtube.com/embed/${video.key}`} // YouTube 비디오를 임베드하기 위한 URL (video.key는 YouTube 비디오 ID)
                    title="Movie Trailer" // 접근성을 위한 제목 (스크린 리더가 읽을 수 있음)
                    frameBorder="0" // iframe 테두리 제거 (0 = 테두리 없음, 1 = 테두리 있음)
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" // iframe에서 허용할 기능들
                    // - accelerometer: 가속도계 사용 (모바일 기기 기울임 감지)
                    // - autoplay: 자동 재생 허용
                    // - clipboard-write: 클립보드에 쓰기 허용
                    // - encrypted-media: 암호화된 미디어 재생 허용
                    // - gyroscope: 자이로스코프 사용 (모바일 기기 회전 감지)
                    // - picture-in-picture: PIP(화면 속 화면) 모드 허용
                    allowFullScreen // 전체 화면 모드 허용 여부 (true/false)
                ></iframe>
            </div>
        </div>
    );
};

export default TrailerIframe;
