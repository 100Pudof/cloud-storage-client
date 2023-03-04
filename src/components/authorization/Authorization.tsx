import React from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { Button, TextField } from "@mui/material";
import cn from "classnames";
import * as yup from "yup";
import { motion } from "framer-motion";

import { loginUser } from "../../redux/actions/authActions";

const Authorization = () => {
    const dispatch = useDispatch();

    const validationSchema = yup.object({
        email: yup
            .string()
            .required("Обязательное поле")
            .email("Введите валидный email"),
        password: yup
            .string()
            .min(4, "Минимум 4 символа")
            .max(16, "Максимум 16 символов")
            .matches(/^[a-zA-Z0-9]+$/, "Только латинница")
            .required("Обязательное поле")
    });

    let handleLogin = (values: Record<string, string>) => {
        dispatch(loginUser({email: values.email, password: values.password}));
    };

    return (
        <motion.div
            className="reuse_form"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <Formik
                initialValues={{
                    email: "test@mail.ru",
                    password: "1234"
                }}
                validateOnBlur={true}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
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
                            <div className="h1">Авторизация</div>
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
                            <Button
                                className="btn_submit"
                                onClick={submitForm}
                                /*disabled={!dirty || !isValid}*/
                                type="submit"
                                variant="contained"
                            >
                                Войти
                            </Button>
                        </div>
                    </>
                }
            </Formik>
        </motion.div>
    );
};

export default Authorization;