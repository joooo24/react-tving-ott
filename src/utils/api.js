import axios from "axios";
const API_KEY = import.meta.env.VITE_API_KEY;

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
    },
});

// 요청 인터셉터를 추가
api.interceptors.request.use(
    // 요청이 전달되기 전에 작업을 수행
    function (config) {
        return config;
    },
    // 요청 오류가 있는 경우 작업을 수행
    function (error) {
        return Promise.reject(error);
    }
);

// 응답 인터셉터를 추가
api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default api;
