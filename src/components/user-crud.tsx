'use client'

import { FormEvent, Suspense, useEffect, useState } from "react"
import { TableUser } from "./table-user"
import ModalCreateUser from "./modal-create-user"
import { IUser } from "@/utils/interfaces/IUser"
import { URL } from "@/utils/enums/URL"

function UserCRUD() {
    const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState<boolean>(false)
    const [users, setUsers] = useState<IUser[]>([])
    const [displayedUsers, setDisplayedUsers] = useState<IUser[]>([])

    function createButtonHandler() {
        setIsCreateUserModalOpen(!isCreateUserModalOpen)
    }

    function inputHandler(newValue: string) {
        const newDisplayedUsers: IUser[] = []
        users.forEach((user, index) => {
            if ((user.name.toLowerCase().includes(newValue.toLowerCase())) || user.cpf.includes(newValue))
                newDisplayedUsers.push(user)
        })
        setDisplayedUsers(newDisplayedUsers)
    }

    useEffect(() => {
        let ignore = false;

        async function getAllUsers() {
            if (ignore)
                return
            try {
                const loggedUserJWT = window.localStorage.getItem('jwt_token')
                const res = await fetch(`${URL.BASE}/user/`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${loggedUserJWT}`
                    },
                    credentials: "include",
                })
                const { message, users: loadedUsers } = await res.json()
                if (message) {
                    return
                }
                setUsers(loadedUsers)
                setDisplayedUsers(loadedUsers)
            } catch (err) {
                console.error(err)
            }
        }
        getAllUsers()

        return () => {
            ignore = true;
        }
    }, [])



    return (
        <div className="px-3">
            <div className="d-flex justify-content-between align-items-center column-gap-4 border-bottom pb-2">
                <button type="button" className="bg-success text-light">Exportar</button>
                <div className="d-flex">
                    <button className="bg-black rounded text-white border-0 fs-3 d-flex justify-content-center align-items-center shadow-sm" style={{ width: '32px', height: '32px' }} onClick={createButtonHandler}>
                        +
                    </button>
                    <form className="shadow-sm d-flex align-items-center">
                        <input type="text" name="search-bar" className="" style={{ width: '', height: '32px' }} onChange={e => inputHandler(e.target.value)} />
                        <button type="submit" className="bg-transparent border-0">
                            <img src="find.svg" alt="Magnifier icon" className="bg-black rounded-end" width={'32px'} height={'32px'} />
                        </button>
                    </form>
                </div>
            </div>
            {isCreateUserModalOpen ? <ModalCreateUser closeButtonHandler={createButtonHandler}></ModalCreateUser> : null}
            <Suspense>
                <TableUser users={displayedUsers}></TableUser>
            </Suspense>
        </div>
    )
}

export { UserCRUD }