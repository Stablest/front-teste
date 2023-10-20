function FormRegister() {
    return (
        <form action="/" method="post" className="d-flex flex-column p-2 bg-success rounded" style={{ width: "18rem" }}>
            <input type="text" name="username" placeholder="Usuário" className="p-2 m-2 rounded border-0 bg-light" />
            <input type="password" name="pwd" placeholder="Senha" className="p-2 m-2 rounded border-0 bg-light" />
            <input type="email" name="email" placeholder="E-mail" className="p-2 m-2 rounded border-0 bg-light" />
            <button type="submit" className="mx-auto mt-4 rounded border-0 text-light bg-dark fs-5 fw-bold rounded" style={{ height: '3rem', width: '10rem' }}>Registrar</button>
        </form>
    )
}

export { FormRegister }