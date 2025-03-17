import { createContext, useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { router } from "expo-router";

interface AuthContextProps {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw new Error("Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    const register = async (email: string, password: string) => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw new Error("Error al registrar usuario");
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        await signOut(auth);
        router.replace("/Login");
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
