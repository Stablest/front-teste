'use client'

import { FormEvent, useRef, useState } from "react"
import { ModalElement } from "./modal-element"
import { IUser } from "@/utils/interfaces/IUser"
import { URL } from "@/utils/enums/URL"
import { Modal } from "./modal"
import { cpf } from "cpf-cnpj-validator"

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
            login: formData.get('login'),
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
        if (!newUser.cpf)
            return
        newUser.cpf = cpf.format(newUser.cpf.toString())
        if (!cpf.isValid(newUser.cpf?.toString())) {
            setErrorMessage('Por favor insira um cpf válido')
            return
        }

        try {
            const loggedUserJWT = window.localStorage.getItem('jwt_token')
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
            setErrorMessage(null)
            window.location.href = '/dashboard'
        } catch (err) {
            setErrorMessage('Houve um erro, tente novamente mais tarde...')
        }
    }

    return (
        <Modal>
            <form action='/dashboard' name="add-user-form" className="w-50 mx-auto bg-light rounded p-3 d-flex flex-column row-gap-4" onSubmit={(e) => formHandler(e)}>
                <ModalElement name={<label htmlFor="name">Name</label>}>
                    <input type="text" name="name" id="name" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="login">Login</label>}>
                    <input required type="text" name="login" id="login" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="cpf">CPF</label>}>
                    <input type="text" name="cpf" id="cpf" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="email">E-mail</label>}>
                    <input type="text" name="email" id="email" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="phone">Telefone</label>}>
                    <input type="text" name="phone" id="phone" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="postal-code">CEP</label>}>
                    <input type="text" name='postal-code' id="postal-code" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="adress">Endereço</label>}>
                    <input type="text" name="adress" id="adress" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="number">Numero</label>}>
                    <input type="text" name="adress-number" id="number" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="complement">Complemento</label>}>
                    <input type="text" name="complement" id="complement" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="neighborhood">Bairro</label>}>
                    <input type="text" name="neighborhood" id="neighborhood" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="city">Cidade</label>}>
                    <input type="text" name="city" id="city" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="state">Estado</label>}>
                    <input type="text" name="state" id="state" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="birth-date">Data de Nascimento</label>}>
                    <input type="datetime-local" name="birth-date" id="birthDate" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="permission">Permissão</label>}>
                    <input type="number" name="permission" id="permission" />
                </ModalElement>
                <div className="d-flex flex-column">
                    <div className="text-danger fw-semibold fs-5 my-3 align-self-center">{errorMessage}</div>
                    <div className="d-flex justify-content-around">
                        <button type="submit" className="bg-success text-light fs-4 px-2" style={{ height: '4rem' }}>Adicionar</button>
                        <button type="button" className="bg-danger text-light fs-4 px-2" onClick={closeButtonHandler} style={{ height: '4rem' }}>Cancelar</button>
                    </div>
                </div>
            </form >
        </Modal>
    )
}

export { ModalCreateUser }