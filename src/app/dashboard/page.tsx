"use client"

import React from "react";
import RequireAuth from "@/components/RequireAuth";
import PersistLogin from "@/components/PersistLogin";
import {Button} from "@/components/ui/button";
import useLogout from "@/lib/hooks/useLogout";

const Dashboard: React.FC = () => {
    const adminLogout = useLogout();

    return (
        <PersistLogin>
            <RequireAuth>
                <h1>dashboard</h1>

                <Button onClick={() => adminLogout()}>
                    LOGOUT
                </Button>
            </RequireAuth>
        </PersistLogin>
    )
}

export default Dashboard;