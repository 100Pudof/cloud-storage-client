export type InitialState = {
    files: File[];
    currentDir: string;
    dirStack: string[];
    loading: boolean;
}

export enum ActionTypes {
    GET_FILES = "GET_FILES",
    SET_FILES = "SET_FILES",
    CREATE_DIR = "CREATE_DIR",
    ADD_FILE = "ADD_FILE",
    UPLOAD_FILE = "UPLOAD_FILE",
    PUSH_TO_STACK = "PUSH_TO_STACK",
    SET_LOADING = "SET_LOADING",
    DOWNLOAD_FILE = "DOWNLOAD_FILE",
    DELETE_FILE = "DELETE_FILE",
    SEARCH_FILES = "SEARCH_FILES",
    DELETE_FILE_STORE = "DELETE_FILE_STORE",
    SET_CURRENT_DIR = "SET_CURRENT_DIR"
}
export type PushStack = {
    type: ActionTypes.PUSH_TO_STACK;
    payload: string;
}

export type GetFiles = {
    type: ActionTypes.GET_FILES;
    payload: number | null;
}
export type SetFiles = {
    type: ActionTypes.SET_FILES;
    payload: any
}
export type SetCurrentDir = {
    type: ActionTypes.SET_CURRENT_DIR;
    payload: string;
}
export type AddFile = {
    type: ActionTypes.ADD_FILE;
    payload: File;
}
export type SetLoading = {
    type: ActionTypes.SET_LOADING;
    payload: boolean;
}
export type DeleteFileStore = {
    type: ActionTypes.DELETE_FILE_STORE;
    payload: File
}
export type File = {
    name: string;
    type: string;
    accessLink?: string;
    size?: number;
    path?: string;
    date?: string;
    user?: string;
    parent?: string;
    childs?: any[];
    __v?: number;
    _id?: string;
}

export type AllActions = SetFiles | SetCurrentDir | AddFile | PushStack | SetLoading | DeleteFileStore;