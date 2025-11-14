
import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { toast } from "react-toastify";


export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { token, expirationTime, clearUser } = useUserStore();

    // User is not logged in
    if (!token || !expirationTime){
        toast.error('Please log in to access this page')
        return <Navigate to="/login" replace />
    }

    // User was logged in but session expired
    if (new Date(expirationTime).getTime() < Date.now()) {
        toast.error('User session expired. Please login again')
        clearUser();
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            {children}
        </>
    )
}
