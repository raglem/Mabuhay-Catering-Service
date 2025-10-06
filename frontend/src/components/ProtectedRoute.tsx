
import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";


export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { token, expirationTime, clearUser } = useUserStore();

    // User is not logged in
    if (!token || !expirationTime){
        // TODO: Notify user login is required
        return <Navigate to="/login" replace />
    }

    // User was logged in but session expired
    if (new Date(expirationTime).getTime() < Date.now()) {
        // TODO: notify user that current user session has expired
        clearUser();
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            {children}
        </>
    )
}
