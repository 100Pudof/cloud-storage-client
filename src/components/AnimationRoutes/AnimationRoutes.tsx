import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";


import { AnimatePresence } from "framer-motion";
import Registration from "../registration/Registration";
import Authorization from "../authorization/Authorization";
import Disk from "../Disk/Disk";

const AnimationRoutes = () => {
    const location = useLocation();
    const {isAuth} = useSelector((state: RootState) => state.userReducer);
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>

                {isAuth !== null &&
                    <>
                        {isAuth
                            ? <>
                                <Route path={"/"} element={<Disk/>}/>
                                <Route path={"*"} element={<Navigate to="/"/>}/>
                            </>
                            : <>
                                <Route path={"/registration"} element={<Registration/>}/>
                                <Route path={"/login"} element={<Authorization/>}/>
                                <Route path={"*"} element={<Navigate to="/login"/>}/>
                            </>}
                    </>
                }
                {/* <Route path={"*"} element={<Navigate to="/"/>}/>*/}
            </Routes>
        </AnimatePresence>
    );
};

export default AnimationRoutes;