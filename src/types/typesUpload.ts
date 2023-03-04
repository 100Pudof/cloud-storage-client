export type InitialState = {
    isVisible: boolean;
    files: File[]
}

export enum ActionTypes {
    SHOW_UPLOADER = "SHOW_UPLOADER",
    ADD_UPLOAD_FILE = "ADD_UPLOAD_FILE",
    REMOVE_UPLOAD_FILE = "REMOVE_UPLOAD_FILE",
    CHANGE_PROGRESS_UPLOAD = "CHANGE_PROGRESS_UPLOAD"
}

type ShowUploader = {
    type: ActionTypes.SHOW_UPLOADER;
    payload: boolean;
}
type AddUploadFile = {
    type: ActionTypes.ADD_UPLOAD_FILE;
    file: File;
}
type ChangeProgressUpload = {
    type: ActionTypes.CHANGE_PROGRESS_UPLOAD;
    file: File;
}
type RemoveUploadFile = {
    type: ActionTypes.REMOVE_UPLOAD_FILE;
    payload: File;
}
export type File = {
    name: string;
    progress: number;
    id: string;
}

export type AllActions = ShowUploader | AddUploadFile | RemoveUploadFile | ChangeProgressUpload;