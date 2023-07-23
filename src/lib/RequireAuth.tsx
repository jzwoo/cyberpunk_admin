"use client"

import useAuth from "@/lib/useAuth";
import React from "react";
import {redirect} from "next/navigation";

const RequireAuth: React.FC = ({children}: { children?: React.ReactNode }) => {
    const {auth} = useAuth();

    if (!auth.user.username) {
        redirect('/');
        return;
    }

    return children;
}

export default RequireAuth;