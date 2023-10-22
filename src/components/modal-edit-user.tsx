'use client'

import { IUser } from "@/utils/interfaces/IUser"
import { Modal } from "./modal"
import { ModalElement } from "./modal-element"
import { FormEvent, useState } from "react"
import { URL } from "@/utils/enums/URL"
import { cpf } from "cpf-cnpj-validator"

export interface ModalEditUserProps {
    user: IUser,
    closeButtonHandler: () => void
}


function ModalEditUser({ user, closeButtonHandler }: ModalEditUserProps) {

    const [errorMessage, setErrorMessage] = useState<String | null>(null)

    async function formHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const updatedUser = {
            name: formData.get('name') || user.name,
            cpf: formData.get('cpf') || user.cpf,
            email: formData.get('email') || user.email,
            phone: formData.get('phone') || user.phone,
            postalCode: formData.get('postal-code') || user.postalCode,
            adress: formData.get('adress') || user.adress,
            adressNumber: formData.get('adress-number') || user.adressNumber,
            complement: formData.get('complement') || user.complement,
            neighborhood: formData.get('neighborhood') || user.neighborhood,
            city: formData.get('city') || user.city,
            state: formData.get('state') || user.state,
            birthDate: formData.get('birth-date')?.toString() || user.birthDate,
            permission: formData.get('permission') || user.permission
        }
        if (!updatedUser.cpf)
            return
        updatedUser.cpf = cpf.format(updatedUser.cpf.toString())
        if (!cpf.isValid(updatedUser.cpf?.toString())) {
            setErrorMessage('Por favor insira um cpf válido')
            return
        }
        try {
            const loggedUserJWT = window.localStorage.getItem('jwt_token')
            const res = await fetch(`${URL.BASE}/user/${user._id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${loggedUserJWT}`
                },
                body: JSON.stringify(updatedUser),
                credentials: "include",
            })
            const { message } = await res.json()
            if (message) {
                setErrorMessage(message)
                return
            }
            window.location.href = '/dashboard'
            setErrorMessage(null)
        } catch (err) {
            console.error(err)
            setErrorMessage('Houve um erro, tente novamente mais tarde...')
        }
    }

    return (
        <Modal>
            <form className="w-50 mx-auto bg-light rounded p-3 d-flex flex-column row-gap-4" onSubmit={formHandler}>
                <ModalElement name={<label htmlFor="name">Name</label>}>
                    <input type="text" name="name" id="name" placeholder={user.name} />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="login">Login</label>}>
                    <input required type="text" name="login" id="login" />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="cpf">CPF</label>}>
                    <input type="text" name="cpf" id="cpf" placeholder={user.cpf.toString()} />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="email">E-mail</label>}>
                    <input type="text" name="email" id="email" placeholder={user.email} />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="phone">Telefone</label>}>
                    <input type="text" name="phone" id="phone" placeholder={user.phone} />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="postal-code">CEP</label>}>
                    <input type="text" name='postal-code' id="postal-code" placeholder={user.postalCode} />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="adress">Endereço</label>}>
                    <input type="text" name="adress" id="adress" placeholder={user.adress} />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="number">Numero</label>}>
                    <input type="text" name="adress-number" id="number" placeholder={user.adressNumber.toString()} />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="complement">Complemento</label>}>
                    <input type="text" name="complement" id="complement" placeholder={user.complement} />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="neighborhood">Bairro</label>}>
                    <input type="text" name="neighborhood" id="neighborhood" placeholder={user.neighborhood} />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="city">Cidade</label>}>
                    <input type="text" name="city" id="city" placeholder={user.city} />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="state">Estado</label>}>
                    <input type="text" name="state" id="state" placeholder={user.state} />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="birth-date">Data de Nascimento</label>}>
                    <input type="datetime-local" name="birth-date" id="birth-date" placeholder={user.birthDate as string} />
                </ModalElement>
                <ModalElement
                    name={<label htmlFor="permission">Permissão</label>}>
                    <input type="number" name="permission" id="permission" placeholder={user.permission.toString()} />
                </ModalElement>
                <div className="d-flex justify-content-around">
                    <button type="submit" className="bg-success text-light fs-4 px-2" style={{ height: '4rem' }}>Atualizar</button>
                    <button type="button" className="bg-danger text-light fs-4 px-2" onClick={closeButtonHandler} style={{ height: '4rem' }}>Cancelar</button>
                </div>
            </form>
        </Modal>
    )
}

export { ModalEditUser }