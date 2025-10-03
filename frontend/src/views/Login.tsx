import { useState } from "react"

export default function Login(){
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    return (
        <div className="page flex justify-center items-center">
            <section className="flex flex-col items-stretch gap-y-4 card p-8 w-[90%] md:w-[50%]">
                <h1 className="font-bold text-3xl">Sign in</h1>
                <div className="border-1 border-black p-2">
                    <input 
                        type="text" className="outline-none w-full"
                        id="mabuhay-username" placeholder="Username" 
                        value={username} onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="flex gap-x-2 border-1 border-black p-2">
                    <input 
                        type={ showPassword ? 'text': 'password' } className="outline-none flex-1"
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
                <div className="flex justify-center">
                    <button className="flex justify-center p-2 w-[80%] min-w-[300px] bg-primary rounded-full text-white cursor-pointer hover:opacity-80">
                        Sign in
                    </button>
                </div>
            </section>
        </div>
    )
}