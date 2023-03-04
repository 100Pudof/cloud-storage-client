import { ActionTypes, AllActions, InitialState } from "../../types/typesUpload";

const initialState: InitialState = {
    isVisible: false,
    files: []
};

const FileReducer = (state = initialState, action: AllActions): InitialState => {
    switch (action.type) {
        case ActionTypes.SHOW_UPLOADER:
            return {
                ...state,
                isVisible: action.payload
            }
        case ActionTypes.ADD_UPLOAD_FILE:
            let newFilesArr = [...state.files];
            newFilesArr = [...newFilesArr, action.file]
            return {
                ...state,
                files: newFilesArr
            }
        case ActionTypes.CHANGE_PROGRESS_UPLOAD:
            let newFiles = [...state.files];
            newFiles.map((file) => {
                if (file.id === action.file.id) {
                    return action.file
                } else
                    return file;
            })
            return {
                ...state,
                files: newFiles
            }
        /* case ActionTypes.REMOVE_UPLOAD_FILE:
             return {
                 ...state,
                 files: [...state.files.filter(file => file._id !== action.payload._id)]
             }*/
        default:
            return state
    }
};
export default FileReducer;