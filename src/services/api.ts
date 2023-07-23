import axios from 'axios';

const axiosAdmin = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000,
});

export async function adminLogin(
    data: { username: string, password: string },
    options?: Record<string, any>
): Promise<APIv1.APIv1Response<{ user: APIv1.admin, accessToken: string }>> {
    return axiosAdmin.request({
        url: "/api/v1/admin/login",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        ...(options || {}),
        data
    })
}
