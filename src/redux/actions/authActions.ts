import { ActionTypes, User } from "../../types/typesUser";

export const notification = (payload: { type: string, message: string }) =>
    ({type: ActionTypes.NOTIFICATION, payload});

export const registrationUser = (payload: { email: string, password: string }) =>
    ({type: ActionTypes.REGISTRATION_USER, payload});

export const loginUser = (payload: { email: string, password: string }) =>
    ({type: ActionTypes.LOGIN_USER, payload});

export const setUser = (payload: User) =>
    ({type: ActionTypes.SET_USER, payload});

export const logout = () =>
    ({type: ActionTypes.LOGOUT});

export const authActions = () =>
    ({type: ActionTypes.AUTH});