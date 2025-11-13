export default function Header(){
    return (
        <header className="flex flex-col gap-y-1 items-center">
            <div className="flex flex-col items-center">
                <h1 className="text-primary-dark text-5xl sm:text-7xl font-bold">MABUHAY</h1>
                <h2 className="text-secondary text-3xl sm:text-5xl">KITCHENETTE</h2>
            </div>
            <div className="flex border-y-1 border-secondary">
                <h3 className="font-bold italic text-primary-dark text-center">Flipino Fastfood & Catering Services</h3>
            </div>
        </header>
    )
}