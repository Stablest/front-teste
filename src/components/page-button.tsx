export interface PageButtonProps {
    page: number
    handleButtonClick: (page: number) => void
}

function PageButton({ page, handleButtonClick }: PageButtonProps) {
    return (
        <button className="border-0 bg-transparent" onClick={e => handleButtonClick(page)}>
            {page}
        </button>
    )
}

export { PageButton }