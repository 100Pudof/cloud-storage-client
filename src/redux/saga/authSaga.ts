import { all, call, delay, put, takeEvery } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { ActionTypes, ErrorResponse, RegistrationUser, User, UserResponse } from "../../types/typesUser";
import { notification, setUser } from "../actions/authActions";
import { apiClient } from "./axiosApi";

function* registrationUser({payload}: RegistrationUser) {
    try {
        const result: AxiosResponse = yield call(() =>
            apiClient.post<UserResponse>("auth/registration", payload)
        );
        yield put(setUser(result.data));
        yield put(notification({type: "success", message: result.data.message}));
        yield delay(3000);
        yield put(notification({type: "success", message: ""}));
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            const responseMessage = (err.response?.data as ErrorResponse).message;
            yield put(notification({type: "error", message: responseMessage}));
            yield delay(3000);
            yield put(notification({type: "error", message: ""}));
        }
    }
}

function* loginUser({payload}: RegistrationUser) {
    try {
        const result: AxiosResponse = yield call(() =>
            apiClient.post<UserResponse>("/auth/login", payload)
        );
        localStorage.setItem("token", result.data.token);
        yield put(setUser(result.data.user));
        yield put(notification({type: "success", message: "Успешно"}));
        yield delay(3000);
        yield put(notification({type: "success", message: ""}));
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            const responseMessage = (err.response?.data as ErrorResponse).message;
            yield put(notification({type: "error", message: responseMessage}));
            yield delay(3000);
            yield put(notification({type: "error", message: ""}));
        }
    }
}

function* authSaga() {
    try {
        const result: AxiosResponse = yield call(() =>
            apiClient.get<UserResponse>("/auth/auth")
        );
        yield put(setUser(result.data.user));
    } catch (err) {
        localStorage.removeItem("token");
        yield put(setUser({} as User));
        if (axios.isAxiosError(err) && err.response) {
            const responseMessage = (err.response?.data as ErrorResponse).message;
            yield put(notification({type: "error", message: responseMessage}));
            yield delay(3000);
            yield put(notification({type: "error", message: ""}));
        }
    }
}

function* mySaga() {
    yield all([
        takeEvery(ActionTypes.REGISTRATION_USER, registrationUser),
        takeEvery(ActionTypes.LOGIN_USER, loginUser),
        takeEvery(ActionTypes.AUTH, authSaga)
    ]);
}

export default mySaga;