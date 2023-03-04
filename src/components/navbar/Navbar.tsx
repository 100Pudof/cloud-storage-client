import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { logout } from "../../redux/actions/authActions";
import logo from "../../images/logo.svg";
import "./Navbar.scss";

const Navbar = () => {
    const {isAuth} = useSelector((state: RootState) => state.userReducer);
    const dispatch = useDispatch();
    let handleLogout = () => {
        dispatch(logout());
    };
    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="logo"/>
                    <span>mern cloud</span>
                </div>
                <div className="auth_block">
                    {isAuth !== null &&
                        <>
                            {isAuth
                                ? <div className="btn" onClick={handleLogout}>Выход</div>
                                : <>
                                    <Link to={"/login"} className="sign_in btn">Войти</Link>
                                    <Link to={"/registration"} className="sign_up btn">Регистрация</Link>
                                </>
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;