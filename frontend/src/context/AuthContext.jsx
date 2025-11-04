import { createContext, useContext, useState, useEffect } from "react";

const authContext = createContext()

// This is what you can import so you can use the context (anywhere)
export const useAuth = () => {
    return useContext(authContext)
}

// This component needs to wrap all components that need the context (main.jsx)
export const AuthProvider = ({ children }) => {

    const [a, setA] = useState(0)

    // Abstract the state-updating logic with some "reducer-like" functions
    const increaseA = () => {
        setA(a + 1)
    }

    const decreaseA = () => {
        setA(a - 1)
    }

    const authContextValue = {
        a: a,
        increaseA: increaseA,
        decreaseA,
        b: 2
    }

    return <authContext.Provider value={authContextValue}>{children}</authContext.Provider>
}