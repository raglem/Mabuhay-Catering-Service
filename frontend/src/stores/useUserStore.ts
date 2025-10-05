import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
    username: string,
    token: string,
    expiresIn: number,
}

type UserStore = {
    username: string;
    token: string;
    expirationTime: Date | null;
    setUser: (newUser: User) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            username: '',
            token: '',
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
                    token: "",
                    expirationTime: null
                }))
        }), 
        {
            name: "mabuhay-user-storage"
        }
    )
)