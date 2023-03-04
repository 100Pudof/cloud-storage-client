import { ActionTypes, File } from "../../types/typesFiles";
import {File as FileUploadType} from '../../types/typesUpload';

export const setCurrentDir = (dirId: string) =>
    ({type: ActionTypes.SET_CURRENT_DIR, payload: dirId});

export const pushToStack = (currentDir: string) =>
    ({type: ActionTypes.PUSH_TO_STACK, payload: currentDir});

export const searchFiles = (search: string) =>
    ({type: ActionTypes.SEARCH_FILES, search});

export const getFiles = (dirId: string, sort: string) =>
    ({type: ActionTypes.GET_FILES, dirId, sort});

export const setFiles = (payload: File) =>
    ({type: ActionTypes.SET_FILES, payload});

export const createDir = (parent: string, name: string) =>
    ({type: ActionTypes.CREATE_DIR, parent, name});

export const addFile = (payload: File) =>
    ({type: ActionTypes.ADD_FILE, payload});

export const uploadFile = (file: any, dirId: string, progressFunc: (value: FileUploadType) => void) =>
    ({type: ActionTypes.UPLOAD_FILE, file, dirId, progressFunc});

export const setLoading = (payload: boolean) =>
    ({type: ActionTypes.SET_LOADING, payload});

export const downloadFile = (file: File) =>
    ({type: ActionTypes.DOWNLOAD_FILE, file});

export const deleteFile = (file: File) =>
    ({type: ActionTypes.DELETE_FILE, file});

export const deleteFileStore = (file: File) =>
    ({type: ActionTypes.DELETE_FILE_STORE, payload: file});