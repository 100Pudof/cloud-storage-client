import { fork } from "redux-saga/effects";
import auth from "./authSaga";
import file from "./filesSaga";

export default function* rootSaga() {
    yield fork(auth);
    yield fork(file);
}
