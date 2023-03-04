import axios, { AxiosError, AxiosResponse } from "axios";

const defaultApiSettings = {
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
};

export const apiClient = axios.create(defaultApiSettings);

let responseSuccessHandler = (response: AxiosResponse) => {
    return response;
};
let responseErrorHandler = (error: AxiosError) => {
    if (error.status === 401) {
        window.location.href = "/login";
        localStorage.removeItem("token");
    }
    return Promise.reject(error);
};

apiClient.interceptors.response.use(
    response => responseSuccessHandler(response),
    error => responseErrorHandler(error)
);

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token)
            config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    null, {synchronous: true}
);


