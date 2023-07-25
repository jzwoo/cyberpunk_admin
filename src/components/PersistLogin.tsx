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
            try {
                await refresh();
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        if (!auth.accessToken) {
            verifyToken().then();
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div>loading...</div>
    }

    return children;
}

export default PersistLogin;