import { TableUser } from "./table-user"

function UserCRUD() {
    return (
        <div className="px-3">
            <div className="d-flex justify-content-end align-items-center column-gap-4 border-bottom pb-2">
                <button className="bg-black rounded text-white border-0 fs-3 d-flex justify-content-center align-items-center shadow-sm" style={{ width: '32px', height: '32px' }}>
                    +
                </button>
                <div className="shadow-sm d-flex align-items-center">
                    <input type="text" name="search-bar" className="" style={{ width: '', height: '32px' }} />
                    <button className="bg-transparent border-0">
                        <img src="find.svg" alt="Magnifier icon" className="bg-black rounded-end" width={'32px'} height={'32px'} />
                    </button>
                </div>
            </div>
            <TableUser></TableUser>
        </div>
    )
}

export { UserCRUD }