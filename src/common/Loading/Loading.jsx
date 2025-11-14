import React from "react";
import "./Loading.scss";

const Loading = ({ message = "Loading..." }) => {
    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-text">{message}</div>
        </div>
    );
};

export default Loading;
