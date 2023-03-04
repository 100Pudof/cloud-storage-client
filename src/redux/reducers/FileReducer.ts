import { ActionTypes, AllActions, InitialState } from "../../types/typesFiles";
import { boolean } from "yup";

const initialState: InitialState = {
    files: [],
    currentDir: "",
    dirStack: [],
    loading: false
};

const FileReducer = (state = initialState, action: AllActions): InitialState => {
    switch (action.type) {
        case ActionTypes.SET_FILES:
            return {
                ...state,
                files: action.payload
            }
        case ActionTypes.ADD_FILE:
            return {
                ...state,
                files: [...state.files, action.payload]
            }
        case ActionTypes.SET_CURRENT_DIR:
            return {
                ...state,
                currentDir: action.payload
            }
        case ActionTypes.PUSH_TO_STACK:
            return {
                ...state,
                dirStack: [...state.dirStack, action.payload]
            }
        case ActionTypes.DELETE_FILE_STORE:
            let newArr = [...state.files];
            console.log(newArr, 'newArr');
            newArr = newArr.filter(file => file._id !== action.payload._id);
            return {
                ...state,
                files: newArr
            }
        default:
            return state
    }
};
export default FileReducer;