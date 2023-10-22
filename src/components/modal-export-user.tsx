import { PDFDownloadLink } from "@react-pdf/renderer"
import { Modal } from "./modal"
import { PDFUserDocument } from "./pdf-user-document"
import { IUser } from "@/utils/interfaces/IUser"

export interface ModalExportUserProps {
    users: IUser[]
    closeButtonHandler: () => void
}

function ModalExportUser({ users, closeButtonHandler }: ModalExportUserProps) {

    function downloadCSV(data: IUser[], fileName: string) {
        let csvHeader = Object.keys(data[0]).join(',') + '\n'; // header row
        let csvBody = data.map((row) => Object.values(row).join(',')).join('\n');

        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvHeader + csvBody);
        hiddenElement.target = '_blank';
        hiddenElement.download = fileName + '.csv';
        hiddenElement.click();
    }

    function exportCSVButtonHandler() {
        downloadCSV(users, '/relatorio_usuarios')
    }

    return (
        <Modal>
            <div className="d-flex flex-column justify-content-between mx-auto p-3 bg-light rounded" style={{ width: '12rem', height: '10rem' }}>
                <button className="align-self-end" type="button" onClick={closeButtonHandler} style={{ width: '2rem' }}>X</button>
                <div className="d-flex flex-column row-gap-2 mx-auto " style={{ width: '8rem' }}>
                    <button type="button" onClick={exportCSVButtonHandler}>Exportar CSV</button>
                    <PDFDownloadLink document={<PDFUserDocument users={users} />} fileName="relatorio.pdf" style={{
                        backgroundColor: 'red', textDecoration: 'none', color: 'white', borderColor: 'black',
                        borderWidth: 2, borderStyle: 'solid', textAlign: 'center'
                    }}>Exportar PDF</PDFDownloadLink>
                </div>
            </div>
        </Modal>
    )
}

export { ModalExportUser }