'use client'

import { IUser } from "@/utils/interfaces/IUser"
import { useEffect, useState } from "react"
import { TableItemUser } from "./table-item-user"
import { URL } from "@/utils/enums/URL"
import { PageButton } from "./page-button"

export interface TableUserProps {
    users: IUser[]
}

function TableUser({ users }: TableUserProps) {

    const [page, setPage] = useState<number>(1)

    const usersPerPage = 10
    const totalPages = Math.ceil(users.length / usersPerPage)

    function getUsersByPage(pageNumber: number) {
        const arrayStart = usersPerPage * (pageNumber - 1)
        const arrayEnd = usersPerPage * (pageNumber)
        return users.slice(arrayStart, arrayEnd)
    }

    function getPageToButton(position: number) {
        switch (position) {
            case 1:
                if (page === 1)
                    return 1
                if ((page === totalPages) && (usersPerPage * 3 >= users.length))
                    return 1
                if (page === totalPages)
                    return page - 2
                return page - 1
            case 2:
                if (page === 1)
                    return page + 1
                if ((page === totalPages) && (usersPerPage * 3 >= users.length))
                    return page
                if (page === totalPages)
                    return page - 1
                return page
            case 3:
                if (page === 1)
                    return page + 2
                if ((page === totalPages) && (usersPerPage * 3 >= users.length))
                    return page + 1
                if (page === totalPages)
                    return page
                return page + 1
        }
        return 0
    }

    function handlePageChange(newPage: number) {
        if (newPage > totalPages)
            return
        setPage(newPage)
    }

    return (
        <>
            <table className="mx-auto w-100">
                <thead>
                    <tr className="border-bottom fs-5">
                        <th className="fw-bold text-success">Nome</th>
                        <th className="fw-bold text-success">Login</th>
                        <th className="fw-bold text-success">E-mail</th>
                        <th className="fw-bold text-success">Idade</th>
                        <th className="fw-bold text-success">Telefone</th>
                        <th className="fw-bold text-success">Status</th>
                        <th className="fw-bold text-success text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {getUsersByPage(page).map((user, index) => <TableItemUser key={index} user={user}></TableItemUser>)}
                </tbody>
            </table>
            <div className="d-flex w-100 justify-content-center">
                <div className="mt-2 d-flex justify-content-around w-25">
                    <PageButton page={getPageToButton(1)} handleButtonClick={handlePageChange}></PageButton>
                    <PageButton page={getPageToButton(2)} handleButtonClick={handlePageChange}></PageButton>
                    <PageButton page={getPageToButton(3)} handleButtonClick={handlePageChange}></PageButton>
                </div>
            </div>
        </>
    )
}

export { TableUser }