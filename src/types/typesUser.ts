export type InitialState = {
    currentUser: {},
    isAuth: boolean | null,
    notification: {
        type: string;
        message: string;
    };
}

export enum ActionTypes {
    REGISTRATION_USER = "REGISTRATION_USER",
    LOGIN_USER = "LOGIN_USER",
    SET_USER = "SET_USER",
    LOGOUT = "LOGOUT",
    AUTH = "AUTH",
    NOTIFICATION = "NOTIFICATION"
}
export type SetUser = {
    type: ActionTypes.SET_USER;
    payload: User
}
export type Logout = {
    type: ActionTypes.LOGOUT;
}
export type Notification = {
    type: ActionTypes.NOTIFICATION;
    payload: {
        type: string;
        message: string;
    };
}
export type RegistrationUser = {
    type: ActionTypes.REGISTRATION_USER,
    payload: {
        email: string;
        password: string;
    }
}

export type ErrorResponse = {
    message: string;
};

export type UserResponse = {
    id: number;
    email: string;
    message: string;
}
export type User = {
    id: number;
}

export type AllAction = RegistrationUser | Notification | SetUser | Logout;