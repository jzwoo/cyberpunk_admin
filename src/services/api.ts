import axios from 'axios';

export const axiosAdmin = axios.create({
    baseURL: 'http://localhost:8000',
});

export const axiosAdmin2 = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
});

export async function adminLogin(
    data: { username: string, password: string },
    options?: Record<string, any>
): Promise<APIv1.APIv1Response<{ user: APIv1.Admin, accessToken: string }>> {
    return axiosAdmin.request({
        url: "/api/v1/admin/login",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        ...(options || {}),
        data
    })
}

export async function refresh(
    options?: Record<string, any>
): Promise<APIv1.APIv1Response<{ user: APIv1.Admin, accessToken: string }>> {
    return axiosAdmin.request({
        url: "/api/v1/admin/refresh",
        method: "GET",
        headers: {"Content-Type": "application/json"},
        ...(options || {}),
    })
}

export async function getAllProducts(
    options?: Record<string, any>
): Promise<APIv1.APIv1Response<APIv1.Product[]>> {
    return axiosAdmin.request({
        url: "/api/v1/products",
        method: "GET",
        headers: {"Content-Type": "application/json"},
        ...(options || {}),
    })
}
