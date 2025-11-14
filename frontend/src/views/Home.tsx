import Header from "../components/Header";

export default function Home() {
    return (
        <div className="page flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-4 h-full max-w-[1000px]">
                <section className="flex flex-col justify-center items-center gap-y-8 h-full w-full">
                    <Header />
                    <div className="flex flex-col gap-y-2 items-center">
                        <img 
                            src="/location.png" alt="Mabuhay Location" 
                            className="w-[80%] md:width-full object-cover rounded-md shadow-md mb-4 md:mb-0 border-2 border-primary-dark"
                        />
                        <footer className="flex flex-col gap-y-2 text-primary-dark text-center">
                            <h2 className="text-primary-dark text-2xl sm:text-3xl font-bold">
                                12233 Artesia Blvd.<br />
                                Cerritos, CA 90703
                            </h2>
                            <h1 className="text-primary-dark text-3xl sm:text-4xl font-bold">
                                (562) 924-4600
                            </h1>
                        </footer>
                    </div>
                </section>
                <section className="flex flex-col items-center gap-y-4 mt-4 md:mt-0">
                    <div className="hidden md:flex">
                        <Header />
                    </div>
                    <h2 className="cursive text-primary-dark text-3xl text-center md:text-4xl font-bold">
                        "Where Cooking is Truly The Filipino Way"
                    </h2>
                    <div className="text-center text-3xl text-primary-dark">
                        <h2>
                            Business Hours
                        </h2>
                        <h2 className="text-secondary">
                            OPEN 7 DAYS A WEEK
                        </h2>
                        <h2>
                            7:30AM - 6PM
                        </h2>
                    </div>
                    <div>
                        <h2 className="text-center text-primary-dark text-3xl font-bold">
                            12233 Artesia Blvd.<br />
                            Cerritos, CA 90703
                        </h2>
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl text-primary-dark">
                            WE SERVE BREAKFAST
                        </h1>
                        <h1 className="text-primary-dark text-2xl sm:text-4xl font-bold">
                            (562) 924-4600
                        </h1>
                    </div>
                    <img 
                        src="/sample.jpg" alt="Mabuhay Sample Dish" 
                        className="w-[70%] md:width-full h-auto object-cover rounded-md shadow-md border-2 border-primary-dark"
                    />
                </section>
            </div>
        </div>
    )
}