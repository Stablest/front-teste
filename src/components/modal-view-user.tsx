'use client'

import { ModalElement } from "./modal-element"
import { Modal } from "./modal"
import { IUser } from "@/utils/interfaces/IUser"

export interface ModalViewUserProps {
    user: IUser
    closeButtonHandler: () => void
}

function ModalViewUser({ closeButtonHandler, user }: ModalViewUserProps) {
    return (
        <Modal>
            <div className="w-25 mx-auto bg-light rounded p-3 d-flex flex-column row-gap-4">
                <ModalElement name={<div>Name</div>}>
                    {user.name}
                </ModalElement>
                <ModalElement name={<div>Login</div>}>
                    {user.login}
                </ModalElement>
                <ModalElement
                    name={<div>CPF</div>}>
                    {user.cpf.toString()}
                </ModalElement>
                <ModalElement
                    name={<div>E-mail</div>}>
                    {user.email}
                </ModalElement>
                <ModalElement
                    name={<div>Telefone</div>}>
                    {user.phone.toString()}
                </ModalElement>
                <ModalElement
                    name={<div>CEP</div>}>
                    {user.postalCode.toString()}
                </ModalElement>
                <ModalElement
                    name={<div>Endereço</div>}>
                    {user.adress}
                </ModalElement>
                <ModalElement
                    name={<div>Numero</div>}>
                    {user.adressNumber.toString()}
                </ModalElement>
                <ModalElement
                    name={<div>Complemento</div>}>
                    {user.complement}
                </ModalElement>
                <ModalElement
                    name={<div>Bairro</div>}>
                    {user.neighborhood}
                </ModalElement>
                <ModalElement
                    name={<div>Cidade</div>}>
                    {user.city}
                </ModalElement>
                <ModalElement
                    name={<div>Estado</div>}>
                    {user.state}
                </ModalElement>
                <ModalElement
                    name={<div>Data de Nascimento</div>}>
                    {new Date(user.birthDate).toLocaleDateString()}
                </ModalElement>
                <ModalElement
                    name={<div>Permissão</div>}>
                    {user.permission.toString()}
                </ModalElement>
                <div className="d-flex justify-content-around">
                    <button type="button" className="bg-danger text-light fs-4 px-2" onClick={closeButtonHandler} style={{ height: '4rem' }}>Voltar</button>
                </div>
            </div>
        </Modal>
    )
}

export { ModalViewUser }