import { TableItemUser } from "./table-item-user"

function TableUser() {
    return (
        <table className="mx-auto w-100">
            <thead>
                <tr className="border-bottom fs-5">
                    <th className="fw-bold text-success">Nome</th>
                    <th className="fw-bold text-success">Login</th>
                    <th className="fw-bold text-success">E-mail</th>
                    <th className="fw-bold text-success">Telefone</th>
                    <th className="fw-bold text-success">Status</th>
                    <th className="fw-bold text-success text-center">Ações</th>
                </tr>
            </thead>
            <tbody>
                <TableItemUser></TableItemUser>
            </tbody>
        </table>
    )
}

export { TableUser }