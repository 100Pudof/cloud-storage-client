import { ActionTypes, AllAction, InitialState } from "../../types/typesUser";

export const initialState: InitialState = {
    currentUser: {},
    isAuth: null,
    notification: {} as { type: string, message: string }
};
 
const UserReducer = (state = initialState, action: AllAction): InitialState => {
    switch (action.type) {
    case ActionTypes.REGISTRATION_USER:
        return state;
    case ActionTypes.NOTIFICATION:
        return {
            ...state,
            notification: action.payload
        };
    case ActionTypes.SET_USER:
        return {
            ...state,
            currentUser: action.payload,
            isAuth: Object.keys(action.payload).length > 0 ? true : false
        };
    case ActionTypes.LOGOUT:
        localStorage.removeItem("token");
        return {
            ...state,
            currentUser: {} as { type: string, message: string },
            isAuth: false
        };
    }
    return state;
};
export default UserReducer;