import React, { useEffect } from "react";
import { Formik } from "formik";
import { Button, TextField } from "@mui/material";
import cn from "classnames";
import * as yup from "yup";
import { motion } from "framer-motion";

import "./Registration.scss";
import { useDispatch, useSelector } from "react-redux";
import { registrationUser } from "../../redux/actions/authActions";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const dispatch = useDispatch();
    const {isAuth} = useSelector((state: RootState) => state.userReducer);
    const navigate = useNavigate();
    const validationSchema = yup.object({
        name: yup
            .string()
            .required("Обязательное поле")
            .test("length_max", "Длина не более 12 символов", (val) => String(val).length <= 12)
            .test("length_min", "Длина не менее 3 символов", (val) => String(val).length >= 3),
        lastName: yup
            .string()
            .required("Обязательное поле")
            .test("length_max", "Длина не более 12 символов", (val) => String(val).length <= 12)
            .test("length_min", "Длина не менее 3 символов", (val) => String(val).length >= 3),
        email: yup
            .string()
            .required("Обязательное поле")
            .email("Введите валидный email"),
        password: yup
            .string()
            .min(4, "Минимум 4 символа")
            .max(16, "Максимум 16 символов")
            .matches(/^[a-zA-Z0-9]+$/, "Только латинница")
            .required("Обязательное поле"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Пароли не совпадают")
            .required("Обязательное поле")
    });

    let handleRegistration = (values: Record<string, string>) => {
        console.log("values", values);
        dispatch(registrationUser({email: values.email, password: values.password}));
    };
    useEffect(() => {
        if (isAuth)
            navigate("/")
    }, [isAuth])
    return (
        <motion.div
            className="reuse_form"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <Formik
                initialValues={{
                    name: "1234",
                    lastName: "1234",
                    email: "test1@mail.ru",
                    password: "1234",
                    confirmPassword: "1234"
                }}
                validateOnBlur={true}
                validationSchema={validationSchema}
                onSubmit={handleRegistration}
            >
                {(
                    {
                        values, errors,
                        touched, handleChange,
                        handleBlur, isValid, dirty, submitForm
                    }
                ) =>
                    <>
                        <div className="form">
                            <div className="h1">Регистрация</div>
                            <TextField
                                className="name field"
                                name={"name"}
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Введите имя..."
                                autoComplete="off"
                                variant="standard"
                            />
                            <div className={cn("error", {show: touched.name && errors.name})}>
                                {errors.name !== undefined ? errors.name : ""}
                            </div>
                            <TextField
                                className="lastName field"
                                name={"lastName"}
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Введите фамилию..."
                                autoComplete="off"
                                variant="standard"
                            />
                            <div className={cn("error", {show: touched.lastName && errors.lastName})}>
                                {errors.lastName !== undefined ? errors.lastName : ""}
                            </div>
                            <TextField
                                className="email field"
                                name={"email"}
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Введите email..."
                                autoComplete="new-password"
                                variant="standard"
                            />
                            <div className={cn("error", {show: touched.email && errors.email})}>
                                {errors.email !== undefined ? errors.email : ""}
                            </div>
                            <TextField
                                className="password field"
                                name={"password"}
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Введите пароль..."
                                autoComplete="new-password"
                                variant="standard"
                                type={"password"}
                            />
                            <div className={cn("error", {show: touched.password && errors.password})}>
                                {errors.password !== undefined ? errors.password : ""}
                            </div>
                            <TextField
                                className="confirmPassword field"
                                name={"confirmPassword"}
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Повторите пароль..."
                                autoComplete="off"
                                variant="standard"
                                type={"password"}
                            />
                            <div className={cn("error", {show: touched.confirmPassword && errors.confirmPassword})}>
                                {errors.confirmPassword !== undefined ? errors.confirmPassword : ""}
                            </div>
                            <Button
                                className="btn_submit"
                                onClick={submitForm}
                                /* disabled={!dirty || !isValid}*/
                                type="submit"
                                variant="contained"
                            >
                                Регистрация
                            </Button>
                        </div>
                    </>
                }
            </Formik>
        </motion.div>
    );
};

export default Registration;