export interface ModalElementProps {
    name: React.ReactNode
    children: React.ReactNode
}

function ModalElement({ name, children }: ModalElementProps) {
    return (
        <div className="d-flex justify-content-between">
            {name}
            <div>
                {children}
            </div>
        </div>
    )
}

export { ModalElement }