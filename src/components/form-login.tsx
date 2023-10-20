function FormLogin() {
    return (
        <form action="" method="post" className="d-flex flex-column p-2 bg-success rounded" style={{ width: "18rem" }}>
            <input type="email" name="email" placeholder="E-mail" className="p-2 m-2 rounded border-0 bg-light" />
            <input type="password" name="pwd" placeholder="Senha" className="p-2 m-2 rounded border-0 bg-light" />
            <div className="mx-auto mt-1 text-light">
                Não possui conta?
                <a href="/register" className="text-dark text-decoration-none fw-semibold">Registrar-se</a>
            </div>
            <button type="submit" className="mx-auto mt-4 rounded border-0 text-light bg-success fs-5 fw-bold rounded">Entrar</button>
        </form>
    )
}

export { FormLogin }