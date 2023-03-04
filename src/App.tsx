import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./redux/actions/authActions";
import { RootState } from "./redux/store";

import { Alert, Snackbar } from "@mui/material";
import Navbar from "./components/navbar/Navbar";
import AnimationRoutes from "./components/AnimationRoutes/AnimationRoutes";

function App() {
    const {notification, currentUser, isAuth} = useSelector((state: RootState) => state.userReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authActions());
    }, []);
    return (
        <div className="App">
            <Navbar/>
            <AnimationRoutes/>
            <Snackbar
                open={!!notification.message}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
            >
                <Alert severity={notification.type === "success" ? "success" : "error"}>{notification.message}</Alert>
            </Snackbar>
        </div>
    );
}

export default App;
