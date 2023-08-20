import useRefreshToken from "@/lib/hooks/useRefreshToken";
import useAuth from "@/lib/hooks/useAuth";
import {useEffect} from "react";
import {axiosAdmin2} from "@/services/api";

const useAxiosAdminPrivate = () => {
    const refresh = useRefreshToken();
    const {auth} = useAuth();

    useEffect(() => {
        const requestIntercept = axiosAdmin2.interceptors.request.use((config) => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
            }

            return config;
        }, (err) => Promise.reject(err));

        const responseIntercept = axiosAdmin2.interceptors.response.use(response => response,
            async (err) => {
                const prevRequest = err?.config;
                if (err?.response?.status === 401 && !prevRequest?.sent) {
                    // to prevent sending again
                    prevRequest.sent = true;
                    // await new Promise(r => setTimeout(r, 10000));
                    console.log('here')

                    try {
                        const newAccessToken = await refresh();
                        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return axiosAdmin2(prevRequest);
                    } catch (e) {
                        axiosAdmin2.interceptors.request.eject(requestIntercept);
                        axiosAdmin2.interceptors.response.eject(responseIntercept);
                        console.log(e)
                        throw new Error('What');
                    }

                    // const newAccessToken = await refresh();
                    // prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    // return axiosAdmin2(prevRequest);
                }

                return Promise.reject(err)
            })

        return () => {
            axiosAdmin2.interceptors.request.eject(requestIntercept);
            axiosAdmin2.interceptors.response.eject(responseIntercept);
        }
    }, []);

    return axiosAdmin2;
}

export default useAxiosAdminPrivate;