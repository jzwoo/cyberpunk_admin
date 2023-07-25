declare namespace APIv1 {
    type APIv1Response<T> = {
        status: number
        statusText: string
        data: T
    }

    type Admin = {
        username: string,
        role: string
    }

    type Image = {
        aspectRatio: number
        url: string
    }

    type Product = {
        _id: string
        name: string
        description: string
        image: Image
        price: number
        quantity: number
        disabled: boolean
    }
}
