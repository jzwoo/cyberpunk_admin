"use client"

import React, {createContext, useState} from "react";

interface authentication {
    user: APIv1.Admin
    accessToken: string
}

const emptyAuth: authentication = {
    user: {username: "", role: ""},
    accessToken: ""
}

export const AuthContext = createContext({
    auth: emptyAuth,
    setAuth: (auth: authentication) => {
    }
})

export const AuthProvider = ({children}: { children?: React.ReactNode }) => {
    const [auth, setAuth] = useState<authentication>(emptyAuth);

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}