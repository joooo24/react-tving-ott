import { Routes, Route } from "react-router-dom";
import "./App.scss";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage/HomePage";
import MoviePage from "./pages/MoviePage/MoviePage";
import MovieDetailPage from "./pages/MovieDetailPage/MovieDetailPage";
import SeriesPage from "./pages/SeriesPage/SeriesPage";
import SeriesDetailPage from "./pages/SeriesPage/SeriesDetailPage";
import DramaPage from "./pages/DramaPage/DramaPage";
import DramaDetailPage from "./pages/DramaPage/DramaDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<HomePage />} />
                <Route path="movies">
                    <Route index element={<MoviePage />} />
                    <Route path=":id" element={<MovieDetailPage />} />
                </Route>
                <Route path="series">
                    <Route index element={<SeriesPage />} />
                    <Route path=":id" element={<SeriesDetailPage />} />
                </Route>
                <Route path="drama">
                    <Route index element={<DramaPage />} />
                    <Route path=":id" element={<DramaDetailPage />} />
                </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;
