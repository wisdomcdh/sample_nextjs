import { createPortal } from "react-dom";
const Modal = ({ children, show, onClose, onDismiss }) => {
    return process.browser && show ? createPortal(
        <div>
            <div>
                {children}
            </div>
            <div>
                <button onClick={onClose}>Close</button>
            </div>
            <div onClick={onDismiss}></div>
        </div>, document.body) : null
}
Modal.defaultProps = {
    show: false,
    onClose: () => { },
    onDismiss: () => { }
}
export default Modal;