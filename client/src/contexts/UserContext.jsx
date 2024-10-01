import React, { useState, createContext } from 'react'

const UserContext = createContext();

function UserContextProvider({ children }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <UserContext.Provider value={{ username, email,setUsername,setEmail, loggedIn, setLoggedIn }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider };
