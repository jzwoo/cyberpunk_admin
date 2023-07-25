"use client"

import React from "react";
import RequireAuth from "@/components/RequireAuth";
import PersistLogin from "@/components/PersistLogin";

const Dashboard: React.FC = () => {
    return (
        <PersistLogin>
            <RequireAuth>
                <h1>dashboard</h1>
            </RequireAuth>
        </PersistLogin>
    )
}

export default Dashboard;