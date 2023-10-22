'use client'

import { URL } from "@/utils/enums/URL";
import { FormEvent, useState } from "react";

function FormLogin() {

    const [errorMessage, setErrorMessage] = useState<String | null>(null)

    async function formHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const login = {
            email: formData.get('email'),
            password: formData.get('password')
        }
        try {
            const res = await fetch(`${URL.BASE}/user/auth`, {
                method: 'POST',
                headers: { "Content-Type": 'application/json' },
                body: JSON.stringify(login),
                credentials: "include",
            })
            const { message, token, user } = await res.json()
            if (message) {
                setErrorMessage(message)
                return
            }
            window.localStorage.setItem('jwt_token', token)
            window.localStorage.setItem('user_id', user.id)
            setErrorMessage(null)
            window.location.href = '/dashboard'
        } catch (err) {
            console.error(err)
            setErrorMessage('Houve um erro, tente novamente mais tarde...')
        }
    }
    return (
        <>

            <form action='/dashboard' className="d-flex flex-column p-2 bg-success rounded" style={{ width: "18rem" }} onSubmit={e => formHandler(e)}>
                <input type="email" name="email" placeholder="E-mail" required className="p-2 m-2 rounded border-0 bg-light" />
                <input type="password" name="password" placeholder="Senha" required className="p-2 m-2 rounded border-0 bg-light" />
                {errorMessage ? <p className="text-danger fw-bold">{errorMessage}</p> : null}
                <button type="submit" className="mx-auto mt-4 rounded border-0 text-light bg-success fs-5 fw-bold rounded">Entrar</button>
            </form>
        </>
    )
}

export { FormLogin }

