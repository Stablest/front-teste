import { useRef } from "react"
import { createPortal } from "react-dom"

export interface ModalProps {
    children: React.ReactNode
}

function Modal({ children }: ModalProps) {
    const divRef = useRef<HTMLDivElement | null>(null)
    return (
        <>
            {createPortal(
                <div ref={divRef} tabIndex={1} aria-modal={true} onLoad={() => divRef.current?.focus()} className="position-absolute top-0 left-0 bottom-0 right-0 bg-black vw-100 bg-gradient bg-opacity-75 d-flex align-items-center z-1">
                    {children}
                </div>
                , document.body)}
        </>
    )
}

export { Modal }