import useRefreshToken from "@/lib/hooks/useRefreshToken";
import useAuth from "@/lib/hooks/useAuth";
import {useEffect} from "react";
import {axiosAdmin} from "@/services/api";

const useAxiosAdminPrivate = () => {
    const refresh = useRefreshToken();
    const {auth} = useAuth();

    useEffect(() => {
        const requestIntercept = axiosAdmin.interceptors.request.use((config) => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
            }

            return config;
        }, (err) => Promise.reject(err));

        const responseIntercept = axiosAdmin.interceptors.response.use(response => response,
            async (err) => {
                const prevRequest = err?.config;
                if (err?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosAdmin(prevRequest);
                }

                return Promise.reject(err)
            })

        return () => {
            axiosAdmin.interceptors.request.eject(requestIntercept);
            axiosAdmin.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh]);

    return axiosAdmin;
}

export default useAxiosAdminPrivate;