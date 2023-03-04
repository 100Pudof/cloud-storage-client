import { all, call, delay, put, takeEvery } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { ActionTypes, GetFiles, File as FileType } from "../../types/typesFiles";
import { apiClient } from "./axiosApi";
import { addFile, deleteFileStore, setFiles, setLoading } from "../actions/fileActions";
import { ErrorResponse } from "../../types/typesUser";
import { notification } from "../actions/authActions";
import { addFileUpload, changeProgressUpload, showUploader } from "../actions/uploadActions";
import { File } from "../../types/typesUpload";

function* getFiles(params: { type: string, dirId: string, sort: string }) {
    try {
        let url = `/files?sort=${params.sort}`;
        if (params.dirId)
            url += `&parent=${params.dirId}`

        const result: AxiosResponse = yield call(() => apiClient.get(url));
        yield put(setFiles(result.data))
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            const responseMessage = (err.response?.data as ErrorResponse).message;
            yield put(notification({type: "error", message: responseMessage}));
            yield delay(3000);
            yield put(notification({type: "error", message: ""}));
        }
    }
}

function* createDir(param: { type: string, parent: string, name: string }) {
    try {
        const result: AxiosResponse = yield call(() =>
            apiClient.post(`/files`, {
                name: param.name,
                type: "dir",
                ...(param.parent ? {parent: param.parent} : {})
            })
        );
        yield put(addFile(result.data))
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            const responseMessage = (err.response?.data as ErrorResponse).message;
            yield put(notification({type: "error", message: responseMessage}));
            yield delay(3000);
            yield put(notification({type: "error", message: ""}));
        }
    }
}

function* uploadFile(param: { type: string, file: any, dirId: string, progressFunc: (value: object) => void }) {
    try {
        yield put(setLoading(true))
        const formData = new FormData();
        formData.append("file", param.file);
        if (param.dirId) {
            formData.append("parent", param.dirId);
        }
        let uploadFile: File = {name: param.file.name, progress: 0, id: String(Date.now()) + param.file.name};
        yield put(showUploader(true));
        yield put(addFileUpload(uploadFile));

        const result: AxiosResponse = yield call(() =>
            apiClient.request(
                {
                    method: 'post',
                    url: `/files/upload`,
                    data: formData,
                    onUploadProgress: (value) => {
                        if (value.total !== undefined && value.loaded !== undefined)
                            uploadFile.progress = Math.round((value.loaded * 100) / value.total);
                        /*yield put(changeProgressUpload(uploadFile))*/
                        param.progressFunc(uploadFile)
                    },
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )
        );
        yield put(addFile(result.data))
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            const responseMessage = (err.response?.data as ErrorResponse).message;
            yield put(notification({type: "error", message: responseMessage}));
            yield delay(3000);
            yield put(notification({type: "error", message: ""}));
        }
    } finally {
        yield put(setLoading(false))

    }
}

function* downloadFile(param: { type: string, file: FileType }) {
    try {
        const result: AxiosResponse = yield call(() =>
            apiClient.request(
                {
                    url: `/files/download?id=${param.file._id}`,
                    method: "GET",
                    responseType: "blob"
                }
            )
                .then(resp => {
                    if (resp.status === 200) {
                        const downloadUrl = URL.createObjectURL(resp.data);
                        const link = document.createElement('a');
                        link.href = downloadUrl;
                        link.download = param.file.name;
                        document.body.appendChild(link);
                        link.click();

                        // clean up "a" element & remove ObjectURL
                        document.body.removeChild(link);
                        URL.revokeObjectURL(downloadUrl);
                    }
                })
        );
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            const responseMessage = (err.response?.data as ErrorResponse).message;
            yield put(notification({type: "error", message: responseMessage}));
            yield delay(3000);
            yield put(notification({type: "error", message: ""}));
        }
    }
}

function* deleteDile(param: { type: string, file: FileType }) {
    try {
        yield call(() =>
            apiClient.delete(`/files?id=${param.file._id}`)
        );
        yield put(deleteFileStore(param.file))
        yield put(notification({type: "success", message: "Файл успешно удалён"}));
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

function* searchFiles(params: { type: string, search: string}) {
    try {

        const result: AxiosResponse = yield call(() =>
            apiClient.get(`/files/search?search=${params.search}`));
        yield put(setFiles(result.data))
    } catch (err) {
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
        takeEvery(ActionTypes.GET_FILES, getFiles),
        takeEvery(ActionTypes.CREATE_DIR, createDir),
        takeEvery(ActionTypes.UPLOAD_FILE, uploadFile),
        takeEvery(ActionTypes.DOWNLOAD_FILE, downloadFile),
        takeEvery(ActionTypes.DELETE_FILE, deleteDile),
        takeEvery(ActionTypes.SEARCH_FILES, searchFiles)
    ]);
}

export default mySaga;