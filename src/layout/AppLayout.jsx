import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "@mui/icons-material";
import "./AppLayout.scss";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const searchByKeyword = (event) => {
        event.preventDefault();
        console.log(keyword);
        navigate(`/movies?q=${keyword}`);
        setKeyword("");
    };

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
                <form className="search-wrap" onSubmit={searchByKeyword}>
                    <input
                        type="text"
                        value={keyword}
                        placeholder="Search"
                        onChange={(event) => {
                            setKeyword(event.target.value);
                        }}
                    />
                    <button type="submit" className="search-btn">
                        <SearchIcon />
                    </button>
                </form>
            </nav>
            <Outlet />
        </>
    );
};

export default AppLayout;
