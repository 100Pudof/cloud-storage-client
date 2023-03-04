import { ActionTypes, File } from "../../types/typesUpload";

export const showUploader = (value: boolean) =>
    ({type: ActionTypes.SHOW_UPLOADER, value});

export const addFileUpload = (file: File) =>
    ({type: ActionTypes.ADD_UPLOAD_FILE, file});

export const changeProgressUpload = (file: File) =>
    ({type: ActionTypes.CHANGE_PROGRESS_UPLOAD, file});