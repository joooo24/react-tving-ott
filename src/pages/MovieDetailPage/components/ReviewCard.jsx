import React from "react";

const ReviewCard = ({ review, isExpanded, onToggle, truncateText }) => {
    const shouldTruncate = review.content && review.content.length > 200;
    const displayText = isExpanded || !shouldTruncate ? review.content : truncateText(review.content);

    return (
        <div className="review-card">
            <div className="review-author">{review.author}</div>
            <div className="review-content">{displayText}</div>
            {shouldTruncate && (
                <button className="review-toggle-btn" onClick={() => onToggle(review.id)}>
                    {isExpanded ? "접기" : "더보기"}
                </button>
            )}
        </div>
    );
};

export default ReviewCard;