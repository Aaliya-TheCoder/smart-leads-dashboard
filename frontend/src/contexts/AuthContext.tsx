import React, {
    createContext,
    useState,
} from "react";

interface AuthContextType {
    token: string | null;

    login: (token: string) => void;

    logout: () => void;
}

export const AuthContext =
    createContext<AuthContextType>(
        {} as AuthContextType
    );

interface Props {
    children: React.ReactNode;
}

export const AuthProvider = ({
    children,
}: Props) => {
    const [token, setToken] = useState<
        string | null
    >(localStorage.getItem("token"));

    const login = (newToken: string) => {
        localStorage.setItem(
            "token",
            newToken
        );

        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("token");

        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};