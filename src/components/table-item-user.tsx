'use client'

import { useState } from "react"
import { ModalViewUser } from "./modal-view-user"
import { IUser } from "@/utils/interfaces/IUser"
import { ModalEditUser } from "./modal-edit-user"
import { URL } from "@/utils/enums/URL"

export interface TableItemUserProps {
    user: IUser
}

function TableItemUser({ user }: TableItemUserProps) {

    const [isEditUserModalOpen, setIsEditUserModalOpen] = useState<boolean>(false)
    const [isViewUserModalOpen, setIsViewUserModalOpen] = useState<boolean>(false)

    function editButtonHandler() {
        setIsEditUserModalOpen(!isEditUserModalOpen)
    }

    function viewButtonHandler() {
        setIsViewUserModalOpen(!isViewUserModalOpen)
    }

    function getUserIdade() {
        const date = new Date(user.birthDate)
        const ageInMs = Date.now() - date.getTime()
        const age = new Date(ageInMs).getFullYear() - 1970
        return age
    }

    async function deleteButtonHandler() {
        if (window.confirm('Tem certeza que deseja excluir o usuário?')) {
            try {
                const loggedUserJWT = window.localStorage.getItem('jwt_token')
                const res = await fetch(`${URL.BASE}/user/${user._id}`, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${loggedUserJWT}`
                    },
                    credentials: "include",
                })
                const { message } = await res.json()
                if (message) {
                    return
                }
                window.location.href = '/dashboard'
                console.log(message)
            } catch (err) {
                console.error(err)
            }
        }
    }

    return (
        <>
            {isViewUserModalOpen ? <ModalViewUser closeButtonHandler={viewButtonHandler} user={user}></ModalViewUser> : null}
            {isEditUserModalOpen ? <ModalEditUser closeButtonHandler={editButtonHandler} user={user}></ModalEditUser> : null}
            <tr className="border-top">
                <td className="fw-light">{user.name}</td>
                <td className="fw-light">{user.login}</td>
                <td className="fw-light">{user.email}</td>
                <td className="fw-light">{getUserIdade()}</td>
                <td className="fw-light">{user.phone.toString()}</td>
                <td className="fw-light">ATIVO</td>
                <td className="fw-light d-flex justify-content-center column-gap-3">
                    <button className="border-0 bg-transparent"><img src="view.svg" alt="View icon" width={32} height={32} className="bg-transparent" onClick={viewButtonHandler} /></button>
                    <button className="border-0 bg-transparent"><img src="edit.svg" alt="Edit icon" width={32} height={32} className="bg-transparent" onClick={editButtonHandler} /></button>
                    <button className="border-0 bg-transparent"><img src="delete.svg" alt="Delete icon" width={32} height={32} className="bg-transparent" onClick={deleteButtonHandler} /></button>
                </td>
            </tr>
        </>
    )
}

export { TableItemUser }