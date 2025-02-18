import { Navigate } from "react-router-dom";
import { UserAuthContext } from "./ProtectedRoute"


import { ReactNode } from "react";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const user = UserAuthContext();
    if(!user) {
        return <Navigate to="/" />
    }
    return children;
}