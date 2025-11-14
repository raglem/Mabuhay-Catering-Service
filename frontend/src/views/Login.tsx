import { useState } from "react"
import api from "../api"
import { useUserStore } from "../stores/useUserStore"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import LoadingSpinner from "../components/LoadingSpinner"

export default function Login(){
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const { setUser } = useUserStore()
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(username.length === 0 || password.length === 0){
            toast.error('Please fill in all fields')
            return
        }

        setLoading(true)
        try{
            const requestBody = {
                username,
                password
            }

            const res = await api.post('/auth/login/', requestBody)

            // Set the current user
            const data = res.data
            const { token, expiresIn } = data
            setUser({
                username,
                token,
                expiresIn
            })

            navigate("/admin")
            toast.success('Staff login successful')

        }
        catch(err){
            if((err as any).response && (err as any).response.status === 401){
                toast.error('Invalid username or password')
                return
            }
            toast.error('Something went wrong on login')
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <div className="page flex justify-center items-center">
            <form className="flex flex-col items-stretch gap-y-4 card p-8 w-full md:w-[50%]" onSubmit={handleLogin}>
                <h1 className="font-bold text-3xl">Sign in</h1>
                <div className="border-1 border-black p-2">
                    <input 
                        type="text" className="outline-none w-full"
                        id="mabuhay-username" placeholder="Username" 
                        value={username} onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="flex justify-between items-center md:gap-x-2 border-1 border-black p-2">
                    <input 
                        type={ showPassword ? 'text': 'password' } className="outline-none"
                        id="mabuhay-password" placeholder="Password" 
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <span 
                        className="text-primary cursor-pointer" 
                        onClick={() => setShowPassword(prev => !prev)}
                    >
                        Show
                    </span>
                </div>
                <div className="flex flex-col justify-center items-center gap-y-2">
                    { loading && <LoadingSpinner />}
                    <button type="submit" className="flex justify-center p-2 w-full md:w-[80%] bg-primary rounded-full text-white cursor-pointer hover:opacity-80">
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    )
}