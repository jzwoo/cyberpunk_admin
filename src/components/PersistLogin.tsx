"use client"

import useAuth from "@/lib/hooks/useAuth";
import React, {useEffect, useState} from "react";
import useRefreshToken from "@/lib/hooks/useRefreshToken";

const PersistLogin: React.FC = ({children}: { children?: React.ReactNode }) => {
    const {auth} = useAuth();
    const refresh = useRefreshToken();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            if (!auth.user.username) {
                await refresh();
            }

            setLoading(false);
        }

        verifyToken().then();
    }, []);

    if (loading) {
        return <div>loading...</div>
    }

    return children;
}

export default PersistLogin;