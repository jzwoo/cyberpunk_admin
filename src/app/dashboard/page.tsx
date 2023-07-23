import React from "react";
import RequireAuth from "@/lib/RequireAuth";

const Dashboard: React.FC = () => {
    return (
        <RequireAuth>
            <h1>dashboard</h1>
        </RequireAuth>
    )
}

export default Dashboard;