import { applyMiddleware, compose, legacy_createStore as createStore, combineReducers } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./saga/rootSaga";
import userReducer from "./reducers/UserReducer";
import fileReducer from "./reducers/FileReducer";
import uploadReducer from "./reducers/UploadReducer";


export const rootReducer = combineReducers({
    userReducer,
    fileReducer,
    uploadReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(sagaMiddleware)
));

export type RootState = ReturnType<typeof rootReducer>
sagaMiddleware.run(rootSaga);

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
