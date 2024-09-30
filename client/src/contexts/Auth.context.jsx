import React, { createContext } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {

    const login = async () => {}
    const singup = async () => {}

    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }



