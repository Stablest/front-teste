function TableItemUser() {
    return (
        <tr className="border-top">
            <td className="fw-light">Nome 1</td>
            <td className="fw-light">login 1</td>
            <td className="fw-light">email@hotmail.com</td>
            <td className="fw-light">34 984016197</td>
            <td className="fw-light">ATIVO</td>
            <td className="fw-light d-flex justify-content-center column-gap-3">
                <button className="border-0 bg-transparent"><img src="view.svg" alt="View icon" width={'32px'} height={'32px'} className="bg-transparent" /></button>
                <button className="border-0 bg-transparent"><img src="edit.svg" alt="Edit icon" width={'32px'} height={'32px'} className="bg-transparent" /></button>
                <button className="border-0 bg-transparent"><img src="delete.svg" alt="Delete icon" width={'32px'} height={'32px'} className="bg-transparent" /></button>
            </td>
        </tr>
    )
}

export { TableItemUser }