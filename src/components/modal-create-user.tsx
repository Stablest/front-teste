'use client'

import { FormEvent, useRef, useState } from "react"
import { ModalElement } from "./modal-element"
import { IUser } from "@/utils/interfaces/IUser"
import { URL } from "@/utils/enums/URL"
import { Modal } from "./modal"

export interface ModalCreateUserProps {
    closeButtonHandler: () => void
}

function ModalCreateUser({ closeButtonHandler }: ModalCreateUserProps) {

    const [errorMessage, setErrorMessage] = useState<String | null>(null)

    async function formHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newUser = {
            name: formData.get('name'),
            cpf: formData.get('cpf'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            postalCode: formData.get('postal-code'),
            adress: formData.get('adress'),
            adressNumber: formData.get('adress-number'),
            complement: formData.get('complement'),
            neighborhood: formData.get('neighborhood'),
            city: formData.get('city'),
            state: formData.get('state'),
            birthDate: formData.get('birth-date')?.toString(),
            password: 0,
            permission: formData.get('permission')
        }
        const loggedUserJWT = window.localStorage.getItem('jwt_token')
        try {
            const res = await fetch(`${URL.BASE}/user/`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${loggedUserJWT}`
                },
                body: JSON.stringify(newUser),
                credentials: "include",
            })
            const { message } = await res.json()
            if (message) {
                setErrorMessage(message)
                return
            }
            console.log(message)
            setErrorMessage(null)
        } catch (err) {
            console.error(err)
            setErrorMessage('Houve um erro, tente novamente mais tarde...')
        }
    }

    return (
        <Modal>
            <form action='/dashboard' name="add-user-form" className="w-50 mx-auto bg-light rounded p-3 d-flex flex-column row-gap-4" onSubmit={(e) => formHandler(e)}>
                <ModalElement
                    name={<label htmlFor="add-user-form">Name</label>}>
                    <input type="text" name="name" id="" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="add-user-form">CPF</label>}>
                    <input type="number" name="cpf" id="" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="add-user-form">E-mail</label>}>
                    <input type="email" name="email" id="" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="add-user-form">Telefone</label>}>
                    <input type="number" name="phone" id="" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="add-user-form">CEP</label>}>
                    <input type="number" name="postal-code" id="" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="add-user-form">Endereço</label>}>
                    <input type="text" name="adress" id="" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="add-user-form">Numero</label>}>
                    <input type="number" name="adress-number" id="" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="add-user-form">Complemento</label>}>
                    <input type="text" name="complement" id="" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="add-user-form">Bairro</label>}>
                    <input type="text" name="neighborhood" id="" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="add-user-form">Cidade</label>}>
                    <input type="text" name="city" id="" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="add-user-form">Estado</label>}>
                    <input type="text" name="state" id="" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="add-user-form">Data de Nascimento</label>}>
                    <input type="datetime-local" name="birth-date" id="" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="add-user-form">Permissão</label>}>
                    <input type="number" name="permission" id="" />
                </ModalElement>
                <div className="d-flex justify-content-around">
                    <button type="submit" className="bg-success text-light fs-4 px-2" style={{ height: '4rem' }}>Adicionar</button>
                    <button type="button" className="bg-danger text-light fs-4 px-2" onClick={closeButtonHandler} style={{ height: '4rem' }}>Cancelar</button>
                </div>
            </form >
        </Modal>
    )
}

export { ModalCreateUser }