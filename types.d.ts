declare namespace APIv1 {
    type APIv1Response<T> = {
        status: number
        statusText: string
        data: T
    }

    type admin = {
        username: string,
        role: string
    }
}