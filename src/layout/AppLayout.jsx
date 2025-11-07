import React from "react";
import { Link } from "react-router-dom";
import "./AppLayout.scss";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <>
            <nav>
                <div className="util-wrap">
                    <h2 className="logo-wrap">
                        <img
                            src="https://image.tving.com/ntgs/operation/logo/2023/09/18/1695032536_1.svg"
                            alt="tving-logo"
                        />
                    </h2>
                    <div className="menu">
                        <Link to="/">HOME</Link>
                        <Link to="/movies">MOVIE</Link>
                        <Link to="/series">SERIES</Link>
                        <Link to="/drama">DRAMA</Link>
                    </div>
                </div>
                <div className="search-wrap">
                    <input type="text" />
                    <button>검색</button>
                </div>
            </nav>
            <Outlet />
        </>
    );
};

export default AppLayout;
