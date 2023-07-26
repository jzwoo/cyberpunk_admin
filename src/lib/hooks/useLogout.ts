import useAuth from "@/lib/hooks/useAuth";
import useAxiosAdminPrivate from "@/lib/hooks/useAxiosAdminPrivate";

const useLogout = () => {
    const {setAuth} = useAuth();
    const axiosAdminPrivate = useAxiosAdminPrivate();

    return async () => {
        axiosAdminPrivate.post("/api/v1/admin/logout", {}, {withCredentials: true}).then();
        setAuth({user: {username: "", role: ""}, accessToken: ""});
    }
}

export default useLogout;