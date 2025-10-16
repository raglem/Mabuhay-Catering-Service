import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
    username: string,
    token: string,
    expiresIn: number,
}

type UserStore = {
    username: string;
    token: string | null;
    expirationTime: Date | null;
    setUser: (newUser: User) => void;
    clearUser: () => void;
    isLoggedIn: () => boolean;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            username: '',
            token: null,
            expirationTime: null,
            setUser: (newUser: User) => 
                set(() => ({
                    username: newUser.username,
                    token: newUser.token,
                    expirationTime: new Date(Date.now() + newUser.expiresIn),
                })),
            clearUser: () => 
                set(() => ({
                    username: "",
                    token: null,
                    expirationTime: null
                })),
            isLoggedIn: () => {
                const { token, expirationTime, clearUser } = get();
        
                if (!token || !expirationTime) {
                    return false;
                }
        
                const now = new Date();
                if (now > new Date(expirationTime)) {
                    clearUser();
                    return false;
                }
        
                return true;
            },
        }), 
        {
            name: "mabuhay-user-storage"
        }
    )
)