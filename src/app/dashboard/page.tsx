import { UserCRUD } from "@/components/user-crud";

export default function Dashboard() {
    return (
        <main className="overflow-auto">
            <h3 className="border-bottom border-1 border-black text-center mt-3 py-2 fw-bold">Listagem De Usuários</h3>
            <UserCRUD></UserCRUD>
        </main>
    )
}