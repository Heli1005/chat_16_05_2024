import React from "react";
import { authUser } from "../components/Auth/auth";
import { Navigate } from "react-router-dom";

const RegisteredUser = ({ children }) => {

    let userExist = authUser().user
    return userExist
        ?
        children
        :
        <Navigate to={'/'} />
};

export default RegisteredUser;
