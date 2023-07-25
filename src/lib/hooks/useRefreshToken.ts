"use client"

import useAuth from "@/lib/hooks/useAuth";
import {refresh} from "@/services/api";

const useRefreshToken = () => {
    const {setAuth} = useAuth();

    return async () => {
        const res = await refresh();
        setAuth(res.data);

        return res.data.accessToken;
    }
}

export default useRefreshToken;