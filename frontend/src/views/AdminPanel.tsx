import Orders from "../components/AdminPanel/Orders";

export default function AdminPanel(){
    return (
        <div className="page flex flex-col gap-y-4">
            <section className="flex flex-col gap-y-2">
                <h1 className="text-black text-3xl border-b-1 border-b-primary">
                    Orders
                </h1>
                <Orders />
            </section>
            <section className="flex flex-col gap-y-2">
                <h1 className="text-black text-3xl border-b-1 border-b-primary">
                    Menu
                </h1>
                <Orders />
            </section>
        </div>
    )
}